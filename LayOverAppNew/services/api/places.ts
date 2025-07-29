import apiClient from './client';
import { API } from '@/constants/API';
import { POI, POISearchParams, POISearchFilters } from '@/types/poi';
import { GooglePlacesResponse, GooglePlace } from '@/types/api';

class PlacesService {
  private apiKey: string = API.keys.googlePlaces || '';

  // Search for places near a location
  async searchNearby(params: POISearchParams): Promise<POI[]> {
    const { location, radius, type, keyword, filters } = params;
    
    const queryParams = new URLSearchParams({
      location: `${location.latitude},${location.longitude}`,
      radius: radius.toString(),
      key: this.apiKey,
    });

    if (type) {
      queryParams.append('type', type);
    }

    if (keyword) {
      queryParams.append('keyword', keyword);
    }

    try {
      const response = await apiClient.get<GooglePlacesResponse>(
        `${API.google.places}/nearbysearch/json?${queryParams.toString()}`
      );

      if (response.success && response.data) {
        return this.transformGooglePlacesToPOIs(response.data.results, filters);
      }

      return [];
    } catch (error) {
      console.error('Error searching nearby places:', error);
      return [];
    }
  }

  // Search for places by text query
  async searchByText(query: string, location?: { latitude: number; longitude: number }): Promise<POI[]> {
    const queryParams = new URLSearchParams({
      query,
      key: this.apiKey,
    });

    if (location) {
      queryParams.append('location', `${location.latitude},${location.longitude}`);
      queryParams.append('radius', '50000'); // 50km radius
    }

    try {
      const response = await apiClient.get<GooglePlacesResponse>(
        `${API.google.places}/textsearch/json?${queryParams.toString()}`
      );

      if (response.success && response.data) {
        return this.transformGooglePlacesToPOIs(response.data.results);
      }

      return [];
    } catch (error) {
      console.error('Error searching places by text:', error);
      return [];
    }
  }

  // Get detailed information about a specific place
  async getPlaceDetails(placeId: string): Promise<POI | null> {
    const queryParams = new URLSearchParams({
      place_id: placeId,
      fields: 'place_id,name,formatted_address,geometry,rating,user_ratings_total,types,photos,opening_hours,price_level,website,formatted_phone_number',
      key: this.apiKey,
    });

    try {
      const response = await apiClient.get<{ result: GooglePlace; status: string }>(
        `${API.google.places}/details/json?${queryParams.toString()}`
      );

      if (response.success && response.data?.result) {
        return this.transformGooglePlaceToPOI(response.data.result);
      }

      return null;
    } catch (error) {
      console.error('Error getting place details:', error);
      return null;
    }
  }

  // Get photo URL for a place
  getPhotoUrl(photoReference: string, maxWidth: number = 400): string {
    return `${API.google.places}/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${this.apiKey}`;
  }

  // Transform Google Places API response to our POI format
  private transformGooglePlacesToPOIs(places: GooglePlace[], filters?: POISearchFilters): POI[] {
    return places
      .map(place => this.transformGooglePlaceToPOI(place))
      .filter(poi => poi && this.applyFilters(poi, filters))
      .sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  // Transform a single Google Place to our POI format
  private transformGooglePlaceToPOI(place: GooglePlace): POI {
    const category = this.determineCategory(place.types);
    
    return {
      id: place.place_id,
      placeId: place.place_id,
      name: place.name,
      address: place.formatted_address,
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
      rating: place.rating,
      userRatingsTotal: place.user_ratings_total,
      types: place.types,
      category,
      description: this.generateDescription(place, category),
      photos: place.photos?.map(photo => this.getPhotoUrl(photo.photo_reference)),
      openingHours: place.opening_hours ? {
        openNow: place.opening_hours.open_now,
        periods: [], // Would need additional API call for detailed hours
        weekdayText: place.opening_hours.weekday_text || [],
      } : undefined,
      priceLevel: place.price_level,
      website: place.website,
      phone: place.formatted_phone_number,
      estimatedVisitTime: this.estimateVisitTime(category),
      distanceFromAirport: 0, // Will be calculated separately
      travelTimeFromAirport: 0, // Will be calculated separately
      isRecommended: this.isRecommended(place, category),
      tags: this.generateTags(place, category),
    };
  }

  // Determine POI category based on Google Places types
  private determineCategory(types: string[]): POI['category'] {
    if (types.includes('museum')) return 'museum';
    if (types.includes('park')) return 'park';
    if (types.includes('restaurant') || types.includes('food')) return 'restaurant';
    if (types.includes('shopping_mall') || types.includes('store')) return 'shopping';
    if (types.includes('tourist_attraction') || types.includes('historical')) return 'historical';
    if (types.includes('amusement_park') || types.includes('movie_theater')) return 'entertainment';
    if (types.includes('art_gallery') || types.includes('library')) return 'cultural';
    if (types.includes('natural_feature') || types.includes('campground')) return 'outdoor';
    if (types.includes('indoor')) return 'indoor';
    
    return 'cultural'; // Default category
  }

  // Generate description based on place type and category
  private generateDescription(place: GooglePlace, category: POI['category']): string {
    const descriptions: Record<POI['category'], string> = {
      museum: 'Explore fascinating exhibits and learn about history, art, and culture.',
      park: 'Enjoy the outdoors with beautiful scenery and recreational activities.',
      restaurant: 'Savor delicious local cuisine and authentic flavors.',
      shopping: 'Discover unique shops and find perfect souvenirs.',
      historical: 'Step back in time and explore historical landmarks.',
      entertainment: 'Have fun with exciting entertainment options.',
      cultural: 'Immerse yourself in local culture and traditions.',
      outdoor: 'Experience nature and outdoor adventures.',
      indoor: 'Stay comfortable with indoor activities.',
      family: 'Perfect for family-friendly activities and fun.',
      romantic: 'Ideal for romantic outings and special moments.',
      budget: 'Great value for money with affordable options.',
      luxury: 'Premium experiences and high-end offerings.',
      quick_visit: 'Perfect for a short, efficient visit.',
      half_day: 'Ideal for spending several hours exploring.',
      full_day: 'Worth dedicating a full day to explore thoroughly.'
    };

    return descriptions[category] || 'A great place to visit during your layover.';
  }

  // Estimate visit time based on category
  private estimateVisitTime(category: POI['category']): number {
    const timeEstimates: Record<POI['category'], number> = {
      museum: 120, // 2 hours
      park: 60, // 1 hour
      restaurant: 45, // 45 minutes
      shopping: 90, // 1.5 hours
      historical: 60, // 1 hour
      entertainment: 120, // 2 hours
      cultural: 90, // 1.5 hours
      outdoor: 60, // 1 hour
      indoor: 60, // 1 hour
      family: 90, // 1.5 hours
      romantic: 60, // 1 hour
      budget: 60, // 1 hour
      luxury: 120, // 2 hours
      quick_visit: 30, // 30 minutes
      half_day: 240, // 4 hours
      full_day: 480 // 8 hours
    };

    return timeEstimates[category] || 60;
  }

  // Determine if a place is recommended
  private isRecommended(place: GooglePlace, category: POI['category']): boolean {
    const hasGoodRating = (place.rating || 0) >= 4.0;
    const hasEnoughReviews = (place.user_ratings_total || 0) >= 50;
    const isPopularCategory = ['museum', 'park', 'restaurant', 'historical'].includes(category);
    
    return hasGoodRating && hasEnoughReviews && isPopularCategory;
  }

  // Generate tags for the POI
  private generateTags(place: GooglePlace, category: POI['category']): string[] {
    const tags: string[] = [category];
    
    if (place.rating && place.rating >= 4.5) tags.push('highly_rated');
    if (place.price_level === 0) tags.push('free');
    if (place.price_level === 1) tags.push('budget');
    if (place.price_level === 3 || place.price_level === 4) tags.push('luxury');
    if (this.estimateVisitTime(category) <= 60) tags.push('quick_visit');
    if (this.estimateVisitTime(category) >= 120) tags.push('half_day');
    
    return tags;
  }

  // Apply filters to POI list
  private applyFilters(poi: POI, filters?: POISearchFilters): boolean {
    if (!filters) return true;

    if (filters.categories && !filters.categories.includes(poi.category)) {
      return false;
    }

    if (filters.maxDistance && poi.distanceFromAirport > filters.maxDistance) {
      return false;
    }

    if (filters.maxPriceLevel && (poi.priceLevel || 0) > filters.maxPriceLevel) {
      return false;
    }

    if (filters.minRating && (poi.rating || 0) < filters.minRating) {
      return false;
    }

    if (filters.openNow && poi.openingHours && !poi.openingHours.openNow) {
      return false;
    }

    if (filters.maxVisitTime && poi.estimatedVisitTime > filters.maxVisitTime) {
      return false;
    }

    if (filters.tags && !filters.tags.some(tag => poi.tags.includes(tag))) {
      return false;
    }

    return true;
  }
}

export const placesService = new PlacesService();
export default placesService; 