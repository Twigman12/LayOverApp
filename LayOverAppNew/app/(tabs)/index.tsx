import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFlight } from '@/context/FlightContext';
import { useUser } from '@/context/UserContext';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

export default function HomeScreen() {
  const router = useRouter();
  const { state: flightState } = useFlight();
  const { state: userState } = useUser();

  const handleAddFlight = () => {
    router.push('/flight-input');
  };

  const handleViewItinerary = () => {
    router.push('/(tabs)/itinerary');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>LayOver</Text>
          <Text style={styles.subtitle}>Transform your layover into an adventure</Text>
        </View>

        {/* Welcome Section */}
        {userState.currentUser && (
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>
              Welcome back, {userState.currentUser.name}!
            </Text>
          </View>
        )}

        {/* Flight Status */}
        {flightState.currentFlight ? (
          <View style={styles.flightCard}>
            <Text style={styles.cardTitle}>Current Flight</Text>
            <View style={styles.flightInfo}>
              <Text style={styles.flightText}>
                Layover in {flightState.currentFlight.layoverCity.code}
              </Text>
              <Text style={styles.timeText}>
                {flightState.currentFlight.arrivalTime.toLocaleTimeString()} - {flightState.currentFlight.departureTime.toLocaleTimeString()}
              </Text>
              {flightState.timeCalculation && (
                <View style={styles.timeCalculation}>
                  <Text style={styles.usableTime}>
                    Usable Time: {Math.floor(flightState.timeCalculation.usableTime / 60)}h {flightState.timeCalculation.usableTime % 60}m
                  </Text>
                  {flightState.timeCalculation.warnings.map((warning, index) => (
                    <Text key={index} style={styles.warning}>
                      ⚠️ {warning}
                    </Text>
                  ))}
                </View>
              )}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleViewItinerary}>
              <Text style={styles.buttonText}>View Itinerary</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No Flight Added</Text>
            <Text style={styles.emptySubtitle}>
              Add your flight details to start planning your layover adventure
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleAddFlight}>
              <Text style={styles.buttonText}>Add Flight</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/search')}>
              <Text style={styles.actionTitle}>Search Places</Text>
              <Text style={styles.actionSubtitle}>Find attractions near your layover</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/itinerary')}>
              <Text style={styles.actionTitle}>My Itineraries</Text>
              <Text style={styles.actionSubtitle}>View saved itineraries</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>Layover Tips</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>💡 Plan Ahead</Text>
            <Text style={styles.tipText}>
              Research your layover city before you arrive to make the most of your time.
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>⏰ Time Management</Text>
            <Text style={styles.tipText}>
              Always allow extra time for security and travel back to the airport.
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>🎒 Travel Light</Text>
            <Text style={styles.tipText}>
              Consider luggage storage at the airport if you plan to explore extensively.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: Layout.padding.screen,
    paddingBottom: Layout.spacing.md,
  },
  title: {
    fontSize: Layout.fontSize.xxxl,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.xs,
  },
  subtitle: {
    fontSize: Layout.fontSize.md,
    color: Colors.textSecondary,
  },
  welcomeSection: {
    paddingHorizontal: Layout.padding.screen,
    marginBottom: Layout.spacing.lg,
  },
  welcomeText: {
    fontSize: Layout.fontSize.lg,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  flightCard: {
    margin: Layout.margins.screen,
    padding: Layout.padding.card,
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.lg,
    ...Layout.shadows.md,
  },
  cardTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.md,
  },
  flightInfo: {
    marginBottom: Layout.spacing.md,
  },
  flightText: {
    fontSize: Layout.fontSize.md,
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.xs,
  },
  timeText: {
    fontSize: Layout.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.sm,
  },
  timeCalculation: {
    marginTop: Layout.spacing.sm,
  },
  usableTime: {
    fontSize: Layout.fontSize.md,
    color: Colors.primary,
    fontWeight: '500',
    marginBottom: Layout.spacing.xs,
  },
  warning: {
    fontSize: Layout.fontSize.sm,
    color: Colors.warning,
    marginBottom: Layout.spacing.xs,
  },
  emptyState: {
    margin: Layout.margins.screen,
    padding: Layout.padding.card,
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.lg,
    alignItems: 'center',
    ...Layout.shadows.md,
  },
  emptyTitle: {
    fontSize: Layout.fontSize.xl,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.sm,
  },
  emptySubtitle: {
    fontSize: Layout.fontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Layout.spacing.lg,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
  },
  quickActions: {
    padding: Layout.padding.screen,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.xl,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.md,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Layout.padding.card,
    borderRadius: Layout.borderRadius.md,
    marginHorizontal: Layout.spacing.xs,
    ...Layout.shadows.sm,
  },
  actionTitle: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.xs,
  },
  actionSubtitle: {
    fontSize: Layout.fontSize.sm,
    color: Colors.textSecondary,
  },
  tipsSection: {
    padding: Layout.padding.screen,
    paddingTop: Layout.spacing.md,
  },
  tipCard: {
    backgroundColor: Colors.white,
    padding: Layout.padding.card,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
    ...Layout.shadows.sm,
  },
  tipTitle: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.xs,
  },
  tipText: {
    fontSize: Layout.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: Layout.lineHeight.relaxed,
  },
}); 