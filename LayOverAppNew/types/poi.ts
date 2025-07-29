/**
 * Point of Interest (POI) details.
 */
export interface POI {
  /** Unique POI ID */
  id: string;
  /** Google Place ID or similar */
  placeId: string;
  /** Name of the POI */
  name: string;
  /** Address */
  address: string;
  /** Latitude */
  latitude: number;
  /** Longitude */
  longitude: number;
  /** Average rating */
  rating?: number;
  /** Total user ratings */
  userRatingsTotal?: number;
  /** Types/categories from API */
  types: string[];
  /** Main category */
  category: POICategory;
  /** Description */
  description?: string;
  /** Photo URLs */
  photos?: string[];
  /** Opening hours */
  openingHours?: OpeningHours;
  /** Price level (0=free, 4=expensive) */
  priceLevel?: number;
  /** Website URL */
  website?: string;
  /** Phone number */
  phone?: string;
  /** Estimated visit time in minutes */
  estimatedVisitTime: number;
  /** Distance from airport in kilometers */
  distanceFromAirport: number;
  /** Travel time from airport in minutes */
  travelTimeFromAirport: number;
  /** Is recommended for layover? */
  isRecommended: boolean;
  /** Tags for filtering/search */
  tags: string[];
}

/**
 * Supported POI categories.
 */
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

/**
 * Opening hours for a POI.
 */
export interface OpeningHours {
  /** Is open now? */
  openNow: boolean;
  /** List of opening periods */
  periods: OpeningPeriod[];
  /** Text for each weekday */
  weekdayText: string[];
}

/**
 * Opening period for a POI.
 */
export interface OpeningPeriod {
  /** Opening time */
  open: DayTime;
  /** Closing time */
  close: DayTime;
}

/**
 * Day and time representation.
 */
export interface DayTime {
  /** Day of week (0=Sunday) */
  day: number;
  /** Time in HHMM format */
  time: string;
}

/**
 * Filters for POI search.
 */
export interface POISearchFilters {
  /** Categories to filter */
  categories?: POICategory[];
  /** Max distance in kilometers */
  maxDistance?: number;
  /** Max price level */
  maxPriceLevel?: number;
  /** Minimum rating */
  minRating?: number;
  /** Only show open now */
  openNow?: boolean;
  /** Max visit time in minutes */
  maxVisitTime?: number;
  /** Tags to filter */
  tags?: string[];
}

/**
 * Parameters for POI search.
 */
export interface POISearchParams {
  /** Search location */
  location: {
    latitude: number;
    longitude: number;
  };
  /** Search radius in meters */
  radius: number;
  /** Type filter */
  type?: string;
  /** Keyword filter */
  keyword?: string;
  /** Additional filters */
  filters?: POISearchFilters;
}

/**
 * POI recommendation result.
 */
export interface POIRecommendation {
  /** POI details */
  poi: POI;
  /** Recommendation score */
  score: number;
  /** Reasons for recommendation */
  reasons: string[];
  /** Best time to visit */
  bestTimeToVisit?: string;
  /** Weather considerations */
  weatherConsideration?: string;
} 