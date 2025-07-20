export interface Itinerary {
  id: string;
  flightId: string;
  userId: string;
  title: string;
  description?: string;
  items: ItineraryItem[];
  totalDuration: number; // in minutes
  totalCost: number; // estimated cost
  status: ItineraryStatus;
  createdAt: Date;
  updatedAt: Date;
}

import { POI } from './poi';

export interface ItineraryItem {
  id: string;
  poiId: string;
  poi: POI;
  order: number;
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  transportationTo?: TransportationOption;
  transportationFrom?: TransportationOption;
  notes?: string;
  isBooked: boolean;
  bookingDetails?: BookingDetails;
}

export type ItineraryStatus = 'draft' | 'planned' | 'active' | 'completed' | 'cancelled';

export interface TransportationOption {
  type: 'taxi' | 'public_transit' | 'walking' | 'rideshare' | 'shuttle';
  duration: number; // in minutes
  distance: number; // in kilometers
  cost: number; // estimated cost
  provider?: string;
  route?: string;
  instructions?: string;
}

export interface BookingDetails {
  bookingId: string;
  provider: string;
  confirmationNumber?: string;
  price: number;
  currency: string;
  bookingDate: Date;
  cancellationPolicy?: string;
}

export interface ItineraryTemplate {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  category: string;
  items: ItineraryTemplateItem[];
  tags: string[];
  popularity: number;
}

export interface ItineraryTemplateItem {
  poiCategory: string;
  duration: number; // in minutes
  order: number;
  optional: boolean;
}

export interface ItineraryValidation {
  isValid: boolean;
  warnings: string[];
  errors: string[];
  totalTime: number;
  bufferTime: number;
  feasibilityScore: number; // 0-100
} 