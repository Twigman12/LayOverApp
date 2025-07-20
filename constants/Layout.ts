import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const Layout = {
  // Screen Dimensions
  screenWidth,
  screenHeight,
  
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  
  // Border Radius
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    round: 50,
  },
  
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 48,
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
  
  // Component Heights
  heights: {
    button: {
      sm: 32,
      md: 44,
      lg: 56,
    },
    input: {
      sm: 36,
      md: 48,
      lg: 56,
    },
    card: {
      sm: 80,
      md: 120,
      lg: 160,
    },
  },
  
  // Component Widths
  widths: {
    button: {
      sm: 80,
      md: 120,
      lg: 160,
      full: '100%',
    },
    card: {
      sm: 200,
      md: 280,
      lg: 320,
      full: '100%',
    },
  },
  
  // Margins
  margins: {
    screen: 16,
    card: 12,
    section: 24,
  },
  
  // Padding
  padding: {
    screen: 16,
    card: 16,
    button: 12,
    input: 12,
  },
  
  // Shadows
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
  
  // Breakpoints
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
  
  // Z-Index
  zIndex: {
    base: 0,
    card: 1,
    modal: 1000,
    overlay: 999,
    tooltip: 1001,
    toast: 1002,
  },
  
  // Animation Durations
  animation: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  
  // Map Configuration
  map: {
    defaultZoom: 15,
    maxZoom: 20,
    minZoom: 10,
    regionDelta: {
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  },
  
  // List Configuration
  list: {
    itemHeight: 80,
    separatorHeight: 1,
    refreshThreshold: 50,
  },
  
  // Modal Configuration
  modal: {
    backdropOpacity: 0.5,
    animationDuration: 300,
  },
} as const;

export type LayoutKey = keyof typeof Layout; 