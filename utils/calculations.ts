import { TimeCalculation } from '@/types/flight';

// Calculate distance between two points using Haversine formula
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Convert degrees to radians
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Calculate travel time based on distance and transportation type
export function calculateTravelTime(
  distance: number,
  transportType: 'walking' | 'driving' | 'transit' | 'bicycling'
): number {
  const speeds = {
    walking: 5, // km/h
    driving: 30, // km/h (city average)
    transit: 25, // km/h (public transport average)
    bicycling: 15, // km/h
  };

  return Math.round((distance / speeds[transportType]) * 60); // Return minutes
}

// Calculate usable time during layover
export function calculateUsableTime(
  arrivalTime: Date,
  departureTime: Date,
  isInternational: boolean = false
): TimeCalculation {
  const totalLayoverTime = (departureTime.getTime() - arrivalTime.getTime()) / (1000 * 60); // minutes
  
  // Security buffer time
  const securityBuffer = isInternational ? 120 : 60; // 2 hours for international, 1 hour for domestic
  
  // Estimated travel time to/from city center (rough estimate)
  const travelTimeToCity = 30; // 30 minutes to city center
  const travelTimeFromCity = 30; // 30 minutes from city center
  
  // Calculate usable time
  const usableTime = totalLayoverTime - securityBuffer - travelTimeToCity - travelTimeFromCity;
  
  // Determine if layover is feasible
  const isFeasible = usableTime >= 60; // At least 1 hour usable time
  
  // Generate warnings
  const warnings: string[] = [];
  
  if (usableTime < 60) {
    warnings.push('Layover time is too short for city exploration');
  } else if (usableTime < 120) {
    warnings.push('Limited time available - consider quick visits only');
  }
  
  if (isInternational) {
    warnings.push('International flight - allow extra time for security');
  }
  
  return {
    totalLayoverTime,
    securityBuffer,
    travelTimeToCity,
    travelTimeFromCity,
    usableTime: Math.max(0, usableTime),
    isFeasible,
    warnings,
  };
}

// Format time duration in human-readable format
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
}

// Format distance in human-readable format
export function formatDistance(kilometers: number): string {
  if (kilometers < 1) {
    return `${Math.round(kilometers * 1000)}m`;
  }
  
  return `${kilometers.toFixed(1)}km`;
}

// Calculate time difference between two dates
export function getTimeDifference(date1: Date, date2: Date): number {
  return Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60); // minutes
}

// Check if a time falls within a range
export function isTimeInRange(
  time: Date,
  startTime: Date,
  endTime: Date
): boolean {
  return time >= startTime && time <= endTime;
}

// Calculate optimal departure time from activity
export function calculateOptimalDepartureTime(
  activityEndTime: Date,
  flightDepartureTime: Date,
  travelTimeToAirport: number,
  securityBuffer: number
): Date {
  const totalBufferTime = travelTimeToAirport + securityBuffer;
  const optimalDeparture = new Date(flightDepartureTime.getTime() - (totalBufferTime * 60 * 1000));
  
  return optimalDeparture;
}

// Calculate if there's enough time between activities
export function hasEnoughTimeBetweenActivities(
  activity1EndTime: Date,
  activity2StartTime: Date,
  travelTime: number,
  bufferTime: number = 15 // 15 minutes buffer
): boolean {
  const timeDifference = getTimeDifference(activity1EndTime, activity2StartTime);
  return timeDifference >= (travelTime + bufferTime);
}

// Calculate total itinerary duration
export function calculateItineraryDuration(
  activities: Array<{ duration: number; travelTime?: number }>
): number {
  return activities.reduce((total, activity) => {
    return total + activity.duration + (activity.travelTime || 0);
  }, 0);
}

// Calculate estimated cost for transportation
export function calculateTransportationCost(
  distance: number,
  transportType: 'taxi' | 'rideshare' | 'public_transit' | 'walking'
): number {
  const rates = {
    taxi: 2.5, // $2.50 per km
    rideshare: 2.0, // $2.00 per km
    public_transit: 0.3, // $0.30 per km
    walking: 0, // Free
  };
  
  return Math.round(distance * rates[transportType]);
}

// Convert timezone offset to hours
export function timezoneOffsetToHours(offset: string): number {
  const match = offset.match(/^([+-])(\d{2}):(\d{2})$/);
  if (!match) return 0;
  
  const sign = match[1] === '+' ? 1 : -1;
  const hours = parseInt(match[2], 10);
  const minutes = parseInt(match[3], 10);
  
  return sign * (hours + minutes / 60);
}

// Adjust time for timezone
export function adjustTimeForTimezone(
  time: Date,
  fromTimezone: string,
  toTimezone: string
): Date {
  // This is a simplified version - in production, use a proper timezone library
  const fromOffset = timezoneOffsetToHours(fromTimezone);
  const toOffset = timezoneOffsetToHours(toTimezone);
  const offsetDifference = toOffset - fromOffset;
  
  return new Date(time.getTime() + (offsetDifference * 60 * 60 * 1000));
} 