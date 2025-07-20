import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FlightProvider } from '@/context/FlightContext';
import { ItineraryProvider } from '@/context/ItineraryContext';
import { UserProvider } from '@/context/UserContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Hide splash screen after resources are loaded
    SplashScreen.hideAsync();
  }, []);

  return (
    <SafeAreaProvider>
      <UserProvider>
        <FlightProvider>
          <ItineraryProvider>
            <Stack
              screenOptions={{
                headerStyle: {
                  backgroundColor: colorScheme === 'dark' ? '#1F2937' : '#FFFFFF',
                },
                headerTintColor: colorScheme === 'dark' ? '#FFFFFF' : '#111827',
                headerTitleStyle: {
                  fontWeight: '600',
                },
                contentStyle: {
                  backgroundColor: colorScheme === 'dark' ? '#111827' : '#F9FAFB',
                },
              }}
            >
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="flight-input"
                options={{
                  title: 'Flight Details',
                  presentation: 'modal',
                }}
              />
              <Stack.Screen
                name="poi-details"
                options={{
                  title: 'Place Details',
                  presentation: 'push',
                }}
              />
              <Stack.Screen
                name="itinerary-builder"
                options={{
                  title: 'Build Itinerary',
                  presentation: 'push',
                }}
              />
              <Stack.Screen
                name="transportation"
                options={{
                  title: 'Transportation',
                  presentation: 'push',
                }}
              />
            </Stack>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          </ItineraryProvider>
        </FlightProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
} 