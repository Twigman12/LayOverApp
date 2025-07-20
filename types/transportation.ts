export interface TransportationOption {
  id: string;
  type: TransportationType;
  provider: string;
  duration: number; // in minutes
  distance: number; // in kilometers
  cost: number; // estimated cost
  currency: string;
  departureTime?: Date;
  arrivalTime?: Date;
  route?: Route;
  instructions: string[];
  accessibility: AccessibilityInfo;
  bookingUrl?: string;
  isAvailable: boolean;
}

export type TransportationType = 
  | 'taxi'
  | 'rideshare'
  | 'public_transit'
  | 'shuttle'
  | 'walking'
  | 'bicycle'
  | 'rental_car';

export interface Route {
  steps: RouteStep[];
  polyline: string;
  trafficLevel?: 'low' | 'medium' | 'high';
}

export interface RouteStep {
  instruction: string;
  distance: number; // in meters
  duration: number; // in seconds
  transportType: TransportationType;
  departureStop?: string;
  arrivalStop?: string;
  line?: string;
}

export interface AccessibilityInfo {
  wheelchairAccessible: boolean;
  requiresReservation: boolean;
  luggageCapacity: 'none' | 'small' | 'medium' | 'large';
  petFriendly: boolean;
}

export interface PublicTransitInfo {
  line: string;
  direction: string;
  departureTime: Date;
  arrivalTime: Date;
  frequency: number; // minutes between departures
  stops: TransitStop[];
  fare: number;
  fareCurrency: string;
}

export interface TransitStop {
  name: string;
  code: string;
  latitude: number;
  longitude: number;
  arrivalTime?: Date;
  departureTime?: Date;
}

export interface RideshareInfo {
  provider: 'uber' | 'lyft' | 'other';
  vehicleType: string;
  estimatedWaitTime: number; // in minutes
  surgeMultiplier?: number;
  driverRating?: number;
  vehicleCapacity: number;
}

export interface AirportShuttleInfo {
  company: string;
  schedule: ShuttleSchedule[];
  reservationRequired: boolean;
  pickupLocation: string;
  dropoffLocation: string;
}

export interface ShuttleSchedule {
  departureTime: string; // HH:MM format
  frequency: number; // minutes
  lastDeparture: string; // HH:MM format
} 