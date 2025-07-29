import { FlightInput } from '@/types/flight';

const AVIATIONSTACK_API_KEY = process.env.AVIATIONSTACK_API_KEY || '879171db5441c2c3786a96beec2a1ded';
const AVIATIONSTACK_BASE_URL = 'http://api.aviationstack.com/v1';

export interface AviationStackFlight {
  flight: {
    number: string;
    iata: string;
    icao: string;
  };
  departure: {
    airport: string;
    iata: string;
    icao: string;
    scheduled: string;
    estimated: string;
    actual: string;
    timezone: string;
  };
  arrival: {
    airport: string;
    iata: string;
    icao: string;
    scheduled: string;
    estimated: string;
    actual: string;
    timezone: string;
  };
  airline: {
    name: string;
    iata: string;
    icao: string;
  };
  flight_status: string;
}

export interface AviationStackResponse {
  data: AviationStackFlight[];
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
}

/**
 * Fetch flight information by flight number
 */
export const getFlightByNumber = async (flightNumber: string): Promise<AviationStackFlight | null> => {
  try {
    const url = `${AVIATIONSTACK_BASE_URL}/flights?access_key=${AVIATIONSTACK_API_KEY}&flight_iata=${flightNumber}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: AviationStackResponse = await response.json();
    
    if (data.data && data.data.length > 0) {
      return data.data[0]; // Return the first matching flight
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    return null;
  }
};

/**
 * Convert AviationStack flight data to FlightInput format
 */
export const convertToFlightInput = (flightData: AviationStackFlight): Partial<FlightInput> => {
  const departureTime = new Date(flightData.departure.scheduled);
  const arrivalTime = new Date(flightData.arrival.scheduled);
  
  return {
    flightNumber: flightData.flight.iata || flightData.flight.number,
    layoverCity: flightData.arrival.iata,
    arrivalTime: arrivalTime.toISOString(),
    departureTime: departureTime.toISOString(),
    isInternational: flightData.departure.iata !== flightData.arrival.iata,
    timezone: flightData.arrival.timezone || 'UTC',
  };
};

/**
 * Auto-fill flight form with data from flight number
 */
export const autoFillFlightData = async (flightNumber: string): Promise<Partial<FlightInput> | null> => {
  try {
    const flightData = await getFlightByNumber(flightNumber);
    
    if (flightData) {
      return convertToFlightInput(flightData);
    }
    
    return null;
  } catch (error) {
    console.error('Error auto-filling flight data:', error);
    return null;
  }
}; 