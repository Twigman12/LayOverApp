export interface POI {
  id: string;
  placeId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  rating?: number;
  userRatingsTotal?: number;
  types: string[];
  category: POICategory;
  description?: string;
  photos?: string[];
  openingHours?: OpeningHours;
  priceLevel?: number; // 0-4, where 0 is free
  website?: string;
  phone?: string;
  estimatedVisitTime: number; // in minutes
  distanceFromAirport: number; // in kilometers
  travelTimeFromAirport: number; // in minutes
  isRecommended: boolean;
  tags: string[];
}

export type POICategory = 
  | 'museum'
  | 'park'
  | 'restaurant'
  | 'shopping'
  | 'historical'
  | 'entertainment'
  | 'cultural'
  | 'outdoor'
  | 'indoor'
  | 'family'
  | 'romantic'
  | 'budget'
  | 'luxury'
  | 'quick_visit'
  | 'half_day'
  | 'full_day';

export interface OpeningHours {
  openNow: boolean;
  periods: OpeningPeriod[];
  weekdayText: string[];
}

export interface OpeningPeriod {
  open: DayTime;
  close: DayTime;
}

export interface DayTime {
  day: number; // 0-6 (Sunday-Saturday)
  time: string; // HHMM format
}

export interface POISearchFilters {
  categories?: POICategory[];
  maxDistance?: number; // in kilometers
  maxPriceLevel?: number;
  minRating?: number;
  openNow?: boolean;
  maxVisitTime?: number; // in minutes
  tags?: string[];
}

export interface POISearchParams {
  location: {
    latitude: number;
    longitude: number;
  };
  radius: number; // in meters
  type?: string;
  keyword?: string;
  filters?: POISearchFilters;
}

export interface POIRecommendation {
  poi: POI;
  score: number;
  reasons: string[];
  bestTimeToVisit?: string;
  weatherConsideration?: string;
} 