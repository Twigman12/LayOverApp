export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: Airport;
  destination: Airport;
  layoverCity: Airport;
  arrivalTime: Date;
  departureTime: Date;
  layoverDuration: number; // in minutes
  usableTime: number; // in minutes
  timezone: string;
  isInternational: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface FlightInput {
  layoverCity: string;
  arrivalTime: string;
  departureTime: string;
  isInternational: boolean;
  timezone: string;
}

export interface TimeCalculation {
  totalLayoverTime: number; // in minutes
  securityBuffer: number; // in minutes
  travelTimeToCity: number; // in minutes
  travelTimeFromCity: number; // in minutes
  usableTime: number; // in minutes
  isFeasible: boolean;
  warnings: string[];
}

export interface FlightStatus {
  flightNumber: string;
  status: 'on_time' | 'delayed' | 'early' | 'cancelled';
  actualArrivalTime?: Date;
  actualDepartureTime?: Date;
  estimatedArrivalTime?: Date;
  estimatedDepartureTime?: Date;
  gate?: string;
  terminal?: string;
} 