/**
 * Represents a flight including layover and timing details.
 */
export interface Flight {
  /** Unique flight identifier */
  id: string;
  /** Flight number */
  flightNumber: string;
  /** Airline name */
  airline: string;
  /** Origin airport */
  origin: Airport;
  /** Destination airport */
  destination: Airport;
  /** Layover city airport */
  layoverCity: Airport;
  /** Arrival time at layover city */
  arrivalTime: Date;
  /** Departure time from layover city */
  departureTime: Date;
  /** Layover duration in minutes */
  layoverDuration: number;
  /** Usable time in minutes */
  usableTime: number;
  /** Timezone of layover city */
  timezone: string;
  /** Whether the flight is international */
  isInternational: boolean;
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
}

/**
 * Airport details.
 */
export interface Airport {
  /** IATA code */
  code: string;
  /** Airport name */
  name: string;
  /** City */
  city: string;
  /** Country */
  country: string;
  /** Latitude */
  latitude: number;
  /** Longitude */
  longitude: number;
  /** Timezone */
  timezone: string;
}

/**
 * User input for flight search.
 */
export interface FlightInput {
  /** Flight number */
  flightNumber: string;
  /** Layover city code */
  layoverCity: string;
  /** Arrival time as ISO string */
  arrivalTime: string;
  /** Departure time as ISO string */
  departureTime: string;
  /** Is international flight */
  isInternational: boolean;
  /** Timezone */
  timezone: string;
}

/**
 * Calculation details for layover and usable time.
 */
export interface TimeCalculation {
  /** Total layover time in minutes */
  totalLayoverTime: number;
  /** Security buffer in minutes */
  securityBuffer: number;
  /** Travel time to city in minutes */
  travelTimeToCity: number;
  /** Travel time from city in minutes */
  travelTimeFromCity: number;
  /** Usable time in minutes */
  usableTime: number;
  /** Is the layover feasible */
  isFeasible: boolean;
  /** Any warnings */
  warnings: string[];
}

/**
 * Real-time flight status.
 */
export interface FlightStatus {
  /** Flight number */
  flightNumber: string;
  /** Status of the flight */
  status: 'on_time' | 'delayed' | 'early' | 'cancelled';
  /** Actual arrival time */
  actualArrivalTime?: Date;
  /** Actual departure time */
  actualDepartureTime?: Date;
  /** Estimated arrival time */
  estimatedArrivalTime?: Date;
  /** Estimated departure time */
  estimatedDepartureTime?: Date;
  /** Gate info */
  gate?: string;
  /** Terminal info */
  terminal?: string;
} 