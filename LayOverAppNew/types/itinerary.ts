/**
 * Represents a user itinerary for a layover.
 */
export interface Itinerary {
  /** Unique itinerary ID */
  id: string;
  /** Associated flight ID */
  flightId: string;
  /** User ID */
  userId: string;
  /** Title of the itinerary */
  title: string;
  /** Optional description */
  description?: string;
  /** List of itinerary items */
  items: ItineraryItem[];
  /** Total duration in minutes */
  totalDuration: number;
  /** Estimated total cost */
  totalCost: number;
  /** Status of the itinerary */
  status: ItineraryStatus;
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
}

import { POI } from './poi';

/**
 * An item/activity in an itinerary.
 */
export interface ItineraryItem {
  /** Unique item ID */
  id: string;
  /** POI ID */
  poiId: string;
  /** POI details */
  poi: POI;
  /** Order in itinerary */
  order: number;
  /** Start time */
  startTime: Date;
  /** End time */
  endTime: Date;
  /** Duration in minutes */
  duration: number;
  /** Transportation to POI */
  transportationTo?: TransportationOption;
  /** Transportation from POI */
  transportationFrom?: TransportationOption;
  /** Optional notes */
  notes?: string;
  /** Is this item booked? */
  isBooked: boolean;
  /** Booking details if booked */
  bookingDetails?: BookingDetails;
}

/**
 * Status of an itinerary.
 */
export type ItineraryStatus = 'draft' | 'planned' | 'active' | 'completed' | 'cancelled';

/**
 * Transportation option for itinerary items.
 */
export interface TransportationOption {
  /** Type of transportation */
  type: 'taxi' | 'public_transit' | 'walking' | 'rideshare' | 'shuttle';
  /** Duration in minutes */
  duration: number;
  /** Distance in kilometers */
  distance: number;
  /** Estimated cost */
  cost: number;
  /** Provider name */
  provider?: string;
  /** Route info */
  route?: string;
  /** Instructions */
  instructions?: string;
}

/**
 * Booking details for itinerary items.
 */
export interface BookingDetails {
  /** Booking ID */
  bookingId: string;
  /** Provider name */
  provider: string;
  /** Confirmation number */
  confirmationNumber?: string;
  /** Price */
  price: number;
  /** Currency */
  currency: string;
  /** Booking date */
  bookingDate: Date;
  /** Cancellation policy */
  cancellationPolicy?: string;
}

/**
 * Template for reusable itineraries.
 */
export interface ItineraryTemplate {
  /** Template ID */
  id: string;
  /** Template name */
  name: string;
  /** Description */
  description: string;
  /** Duration in minutes */
  duration: number;
  /** Category */
  category: string;
  /** Template items */
  items: ItineraryTemplateItem[];
  /** Tags */
  tags: string[];
  /** Popularity score */
  popularity: number;
}

/**
 * Item in an itinerary template.
 */
export interface ItineraryTemplateItem {
  /** POI category */
  poiCategory: string;
  /** Duration in minutes */
  duration: number;
  /** Order in template */
  order: number;
  /** Is this item optional? */
  optional: boolean;
}

/**
 * Validation result for an itinerary.
 */
export interface ItineraryValidation {
  /** Is the itinerary valid? */
  isValid: boolean;
  /** Warnings */
  warnings: string[];
  /** Errors */
  errors: string[];
  /** Total time in minutes */
  totalTime: number;
  /** Buffer time in minutes */
  bufferTime: number;
  /** Feasibility score (0-100) */
  feasibilityScore: number;
} 