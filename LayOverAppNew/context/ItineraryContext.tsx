import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Itinerary, ItineraryItem } from '@/types/itinerary';
import { POI } from '@/types/poi';
import { calculateItineraryDuration } from '@/utils/calculations';

interface ItineraryState {
  currentItinerary: Itinerary | null;
  selectedPOIs: POI[];
  isLoading: boolean;
  error: string | null;
}

type ItineraryAction =
  | { type: 'SET_ITINERARY'; payload: Itinerary }
  | { type: 'ADD_POI'; payload: POI }
  | { type: 'REMOVE_POI'; payload: string }
  | { type: 'REORDER_ITEMS'; payload: ItineraryItem[] }
  | { type: 'UPDATE_ITEM'; payload: { id: string; updates: Partial<ItineraryItem> } }
  | { type: 'CLEAR_ITINERARY' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: ItineraryState = {
  currentItinerary: null,
  selectedPOIs: [],
  isLoading: false,
  error: null,
};

function itineraryReducer(state: ItineraryState, action: ItineraryAction): ItineraryState {
  switch (action.type) {
    case 'SET_ITINERARY':
      return {
        ...state,
        currentItinerary: action.payload,
        error: null,
      };
    case 'ADD_POI':
      return {
        ...state,
        selectedPOIs: [...state.selectedPOIs, action.payload],
      };
    case 'REMOVE_POI':
      return {
        ...state,
        selectedPOIs: state.selectedPOIs.filter(poi => poi.id !== action.payload),
      };
    case 'REORDER_ITEMS':
      if (state.currentItinerary) {
        return {
          ...state,
          currentItinerary: {
            ...state.currentItinerary,
            items: action.payload,
          },
        };
      }
      return state;
    case 'UPDATE_ITEM':
      if (state.currentItinerary) {
        const updatedItems = state.currentItinerary.items.map(item =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updates }
            : item
        );
        return {
          ...state,
          currentItinerary: {
            ...state.currentItinerary,
            items: updatedItems,
          },
        };
      }
      return state;
    case 'CLEAR_ITINERARY':
      return {
        ...state,
        currentItinerary: null,
        selectedPOIs: [],
        error: null,
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
    default:
      return state;
  }
}

interface ItineraryContextType {
  state: ItineraryState;
  createItinerary: (flightId: string, title: string) => void;
  addPOI: (poi: POI) => void;
  removePOI: (poiId: string) => void;
  reorderItems: (items: ItineraryItem[]) => void;
  updateItem: (id: string, updates: Partial<ItineraryItem>) => void;
  clearItinerary: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getTotalDuration: () => number;
  getTotalCost: () => number;
}

const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

interface ItineraryProviderProps {
  children: ReactNode;
}

export function ItineraryProvider({ children }: ItineraryProviderProps) {
  const [state, dispatch] = useReducer(itineraryReducer, initialState);

  const createItinerary = (flightId: string, title: string) => {
    const itinerary: Itinerary = {
      id: Date.now().toString(),
      flightId,
      userId: 'current-user', // Will be replaced with actual user ID
      title,
      items: [],
      totalDuration: 0,
      totalCost: 0,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dispatch({ type: 'SET_ITINERARY', payload: itinerary });
  };

  const addPOI = (poi: POI) => {
    dispatch({ type: 'ADD_POI', payload: poi });

    if (state.currentItinerary) {
      const newItem: ItineraryItem = {
        id: Date.now().toString(),
        poiId: poi.id,
        poi,
        order: state.currentItinerary.items.length,
        startTime: new Date(), // Will be calculated based on previous items
        endTime: new Date(), // Will be calculated based on duration
        duration: poi.estimatedVisitTime,
        notes: '',
        isBooked: false,
      };

      const updatedItems = [...state.currentItinerary.items, newItem];
      dispatch({ type: 'REORDER_ITEMS', payload: updatedItems });
    }
  };

  const removePOI = (poiId: string) => {
    dispatch({ type: 'REMOVE_POI', payload: poiId });

    if (state.currentItinerary) {
      const updatedItems = state.currentItinerary.items.filter(item => item.poiId !== poiId);
      dispatch({ type: 'REORDER_ITEMS', payload: updatedItems });
    }
  };

  const reorderItems = (items: ItineraryItem[]) => {
    dispatch({ type: 'REORDER_ITEMS', payload: items });
  };

  const updateItem = (id: string, updates: Partial<ItineraryItem>) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { id, updates } });
  };

  const clearItinerary = () => {
    dispatch({ type: 'CLEAR_ITINERARY' });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const getTotalDuration = (): number => {
    if (!state.currentItinerary) return 0;
    return calculateItineraryDuration(state.currentItinerary.items);
  };

  const getTotalCost = (): number => {
    if (!state.currentItinerary) return 0;
    return state.currentItinerary.items.reduce((total, item) => {
      return total + (item.transportationTo?.cost || 0) + (item.transportationFrom?.cost || 0);
    }, 0);
  };

  const value: ItineraryContextType = {
    state,
    createItinerary,
    addPOI,
    removePOI,
    reorderItems,
    updateItem,
    clearItinerary,
    setLoading,
    setError,
    getTotalDuration,
    getTotalCost,
  };

  return (
    <ItineraryContext.Provider value={value}>
      {children}
    </ItineraryContext.Provider>
  );
}

export function useItinerary() {
  const context = useContext(ItineraryContext);
  if (context === undefined) {
    throw new Error('useItinerary must be used within an ItineraryProvider');
  }
  return context;
} 