// Environment variables will be handled by react-native-config
export const API = {
  // Base URLs
  baseURL: 'https://api.layover-app.com', // Will be overridden by env
  version: 'v1', // Will be overridden by env
  
  // Google APIs
  google: {
    places: 'https://maps.googleapis.com/maps/api/place',
    directions: 'https://maps.googleapis.com/maps/api/directions',
    geocoding: 'https://maps.googleapis.com/maps/api/geocode',
    maps: 'https://maps.googleapis.com/maps/api',
  },
  
  // Endpoints
  endpoints: {
    // Flight endpoints
    flights: '/flights',
    flightStatus: '/flights/status',
    
    // POI endpoints
    pois: '/pois',
    poiSearch: '/pois/search',
    poiDetails: '/pois/details',
    poiRecommendations: '/pois/recommendations',
    
    // Itinerary endpoints
    itineraries: '/itineraries',
    itineraryTemplates: '/itineraries/templates',
    itineraryValidation: '/itineraries/validate',
    
    // Transportation endpoints
    transportation: '/transportation',
    routes: '/transportation/routes',
    options: '/transportation/options',
    
    // User endpoints
    users: '/users',
    preferences: '/users/preferences',
    savedItineraries: '/users/itineraries',
    
    // Booking endpoints
    bookings: '/bookings',
    availability: '/bookings/availability',
    
    // Weather endpoints
    weather: '/weather',
    
    // Airport endpoints
    airports: '/airports',
    airportInfo: '/airports/info',
  },
  
  // Timeouts
  timeouts: {
    request: 10000, // 10 seconds
    upload: 30000, // 30 seconds
    download: 60000, // 60 seconds
  },
  
  // Retry configuration
  retry: {
    attempts: 3,
    delay: 1000, // 1 second
    backoff: 2, // exponential backoff multiplier
  },
  
  // Rate limiting
  rateLimit: {
    requestsPerMinute: 60,
    requestsPerHour: 1000,
  },
  
  // Cache configuration
  cache: {
    poiSearch: 300000, // 5 minutes
    poiDetails: 3600000, // 1 hour
    directions: 1800000, // 30 minutes
    weather: 900000, // 15 minutes
    airportInfo: 86400000, // 24 hours
  },
  
  // API Keys (from environment variables)
  keys: {
    googlePlaces: '', // Will be set from env
    googleMaps: '', // Will be set from env
    googleDirections: '', // Will be set from env
  },
  
  // Headers
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'LayOverApp/1.0.0',
  },
  
  // Error codes
  errorCodes: {
    NETWORK_ERROR: 'NETWORK_ERROR',
    TIMEOUT_ERROR: 'TIMEOUT_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    SERVER_ERROR: 'SERVER_ERROR',
    RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  },
  
  // Status codes
  statusCodes: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
  },
} as const;

export type APIKey = keyof typeof API; 