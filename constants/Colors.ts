export const Colors = {
  // Primary Colors
  primary: '#2563EB',
  primaryLight: '#3B82F6',
  primaryDark: '#1D4ED8',
  
  // Secondary Colors
  secondary: '#10B981',
  secondaryLight: '#34D399',
  secondaryDark: '#059669',
  
  // Accent Colors
  accent: '#F59E0B',
  accentLight: '#FBBF24',
  accentDark: '#D97706',
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  
  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Background Colors
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  backgroundTertiary: '#F3F4F6',
  
  // Text Colors
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',
  
  // Border Colors
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  borderDark: '#D1D5DB',
  
  // Shadow Colors
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.2)',
  
  // Overlay Colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  
  // Category Colors
  museum: '#8B5CF6',
  park: '#10B981',
  restaurant: '#F59E0B',
  shopping: '#EF4444',
  historical: '#DC2626',
  entertainment: '#EC4899',
  cultural: '#7C3AED',
  outdoor: '#059669',
  indoor: '#3B82F6',
  family: '#F97316',
  romantic: '#EC4899',
  budget: '#10B981',
  luxury: '#F59E0B',
  quickVisit: '#3B82F6',
  halfDay: '#8B5CF6',
  fullDay: '#DC2626',
  
  // Transportation Colors
  taxi: '#F59E0B',
  rideshare: '#3B82F6',
  publicTransit: '#10B981',
  shuttle: '#8B5CF6',
  walking: '#6B7280',
  bicycle: '#059669',
  rentalCar: '#DC2626',
} as const;

export type ColorKey = keyof typeof Colors; 