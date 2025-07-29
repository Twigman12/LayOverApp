import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Flight, FlightInput, TimeCalculation } from '@/types/flight';
import { calculateUsableTime } from '@/utils/calculations';

interface FlightState {
  currentFlight: Flight | null;
  timeCalculation: TimeCalculation | null;
  isLoading: boolean;
  error: string | null;
}

type FlightAction =
  | { type: 'SET_FLIGHT'; payload: Flight }
  | { type: 'SET_TIME_CALCULATION'; payload: TimeCalculation }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_FLIGHT' }
  | { type: 'UPDATE_FLIGHT'; payload: Partial<Flight> };

const initialState: FlightState = {
  currentFlight: null,
  timeCalculation: null,
  isLoading: false,
  error: null,
};

function flightReducer(state: FlightState, action: FlightAction): FlightState {
  switch (action.type) {
    case 'SET_FLIGHT':
      return {
        ...state,
        currentFlight: action.payload,
        error: null,
      };
    case 'SET_TIME_CALCULATION':
      return {
        ...state,
        timeCalculation: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'CLEAR_FLIGHT':
      return {
        ...state,
        currentFlight: null,
        timeCalculation: null,
        error: null,
      };
    case 'UPDATE_FLIGHT':
      return {
        ...state,
        currentFlight: state.currentFlight
          ? { ...state.currentFlight, ...action.payload }
          : null,
      };
    default:
      return state;
  }
}

interface FlightContextType {
  state: FlightState;
  setFlight: (flight: Flight) => void;
  setFlightInput: (input: FlightInput) => void;
  calculateTime: (arrivalTime: Date, departureTime: Date, isInternational: boolean) => void;
  clearFlight: () => void;
  updateFlight: (updates: Partial<Flight>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const FlightContext = createContext<FlightContextType | undefined>(undefined);

interface FlightProviderProps {
  children: ReactNode;
}

export function FlightProvider({ children }: FlightProviderProps) {
  const [state, dispatch] = useReducer(flightReducer, initialState);

  const setFlight = (flight: Flight) => {
    dispatch({ type: 'SET_FLIGHT', payload: flight });
  };

  const setFlightInput = (input: FlightInput) => {
    // Convert string times to Date objects
    const arrivalTime = new Date(input.arrivalTime);
    const departureTime = new Date(input.departureTime);
    
    // Calculate layover duration
    const layoverDuration = (departureTime.getTime() - arrivalTime.getTime()) / (1000 * 60);
    
    // Create a basic flight object (will be enhanced with API data)
    const flight: Flight = {
      id: Date.now().toString(), // Temporary ID
      flightNumber: '',
      airline: '',
      origin: {
        code: '',
        name: '',
        city: '',
        country: '',
        latitude: 0,
        longitude: 0,
        timezone: '',
      },
      destination: {
        code: '',
        name: '',
        city: '',
        country: '',
        latitude: 0,
        longitude: 0,
        timezone: '',
      },
      layoverCity: {
        code: input.layoverCity,
        name: '',
        city: '',
        country: '',
        latitude: 0,
        longitude: 0,
        timezone: input.timezone,
      },
      arrivalTime,
      departureTime,
      layoverDuration,
      usableTime: 0, // Will be calculated
      timezone: input.timezone,
      isInternational: input.isInternational,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dispatch({ type: 'SET_FLIGHT', payload: flight });
    
    // Calculate usable time
    calculateTime(arrivalTime, departureTime, input.isInternational);
  };

  const calculateTime = (arrivalTime: Date, departureTime: Date, isInternational: boolean) => {
    const timeCalculation = calculateUsableTime(arrivalTime, departureTime, isInternational);
    dispatch({ type: 'SET_TIME_CALCULATION', payload: timeCalculation });
  };

  const clearFlight = () => {
    dispatch({ type: 'CLEAR_FLIGHT' });
  };

  const updateFlight = (updates: Partial<Flight>) => {
    dispatch({ type: 'UPDATE_FLIGHT', payload: updates });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const value: FlightContextType = {
    state,
    setFlight,
    setFlightInput,
    calculateTime,
    clearFlight,
    updateFlight,
    setLoading,
    setError,
  };

  return (
    <FlightContext.Provider value={value}>
      {children}
    </FlightContext.Provider>
  );
}

export function useFlight() {
  const context = useContext(FlightContext);
  if (context === undefined) {
    throw new Error('useFlight must be used within a FlightProvider');
  }
  return context;
} 