import { Tabs } from 'expo-router';
import { useColorScheme, View, Text } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.editorial.navy,
        tabBarInactiveTintColor: Colors.editorial.warmGray,
        tabBarStyle: {
          backgroundColor: Colors.editorial.lightCream,
          borderTopColor: Colors.editorial.navy,
          borderTopWidth: 3,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="home" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'SEARCH',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="search" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="itinerary"
        options={{
          title: 'TRIPS',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="list" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="person" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

// Simple tab bar icon component (will be replaced with proper icons)
function TabBarIcon({ name, color, focused }: { name: string; color: string; focused: boolean }) {
  return (
    <View style={{ 
      width: 24, 
      height: 24, 
      backgroundColor: focused ? Colors.editorial.skyBlue : 'transparent',
      borderRadius: 0,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0,
    }}>
      <Text style={{
        color: focused ? Colors.editorial.navy : color,
        fontSize: 14,
        fontWeight: focused ? '900' : '700',
        letterSpacing: 1,
      }}>
        {name.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
} 