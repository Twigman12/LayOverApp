import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFlight } from '@/context/FlightContext';
import { useUser } from '@/context/UserContext';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { RetroIcon } from '@/components/RetroIcons';

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

  const handleSearchAttractions = () => {
    router.push('/(tabs)/search');
  };

  const handleViewItineraries = () => {
    router.push('/(tabs)/itinerary');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Editorial Header */}
        <View style={styles.header}>
          <Text style={styles.masthead}>ITINEREADY</Text>
          <Text style={styles.tagline}>TRANSFORM YOUR LAYOVER INTO AN ADVENTURE</Text>
          <View style={styles.headerAccent} />
        </View>

        {/* Welcome Section */}
        {userState.currentUser && (
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>
              WELCOME BACK, {userState.currentUser.name.toUpperCase()}!
            </Text>
          </View>
        )}

        {/* Flight Status Card */}
        {flightState.currentFlight ? (
          <View style={styles.flightCard}>
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleRow}>
                <RetroIcon name="plane" size={24} color={Colors.editorial.coral} />
                <Text style={styles.cardTitle}>CURRENT FLIGHT</Text>
              </View>
              <View style={styles.editorialAccent} />
            </View>
            <View style={styles.flightInfo}>
              <Text style={styles.flightText}>
                LAYOVER IN {flightState.currentFlight.layoverCity.code}
              </Text>
              <Text style={styles.timeText}>
                {flightState.currentFlight.arrivalTime.toLocaleTimeString()} - {flightState.currentFlight.departureTime.toLocaleTimeString()}
              </Text>
              {flightState.timeCalculation && (
                <View style={styles.timeCalculation}>
                  <Text style={styles.usableTime}>
                    USABLE TIME: {Math.floor(flightState.timeCalculation.usableTime / 60)}H {flightState.timeCalculation.usableTime % 60}M
                  </Text>
                  {flightState.timeCalculation.warnings.map((warning, index) => (
                    <View key={index} style={styles.warningRow}>
                      <RetroIcon name="warning" size={16} color={Colors.editorial.coral} />
                      <Text style={styles.warning}>{warning.toUpperCase()}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
            <TouchableOpacity style={styles.primaryButton} onPress={handleViewItinerary}>
              <Text style={styles.primaryButtonText}>VIEW ITINERARY</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleRow}>
                <RetroIcon name="plane" size={24} color={Colors.editorial.coral} />
                <Text style={styles.cardTitle}>NO FLIGHT ADDED</Text>
              </View>
            </View>
            <View style={styles.editorialAccent} />
            <Text style={styles.emptySubtitle}>
              ADD YOUR FLIGHT DETAILS TO START PLANNING YOUR LAYOVER ADVENTURE
            </Text>
            <TouchableOpacity style={styles.primaryButton} onPress={handleAddFlight}>
              <Text style={styles.primaryButtonText}>+ ADD FLIGHT</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Main Action Grid */}
        <View style={styles.actionSection}>
          <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionButton} onPress={handleSearchAttractions}>
              <RetroIcon name="search" size={32} color={Colors.editorial.skyBlue} />
              <Text style={styles.actionButtonText}>SEARCH NEARBY ATTRACTIONS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleViewItineraries}>
              <RetroIcon name="trips" size={32} color={Colors.editorial.coral} />
              <Text style={styles.actionButtonText}>VIEW MY ITINERARIES</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Editorial Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionTitle}>TRAVEL TIPS</Text>
          <View style={styles.tipsGrid}>
            <View style={styles.tipCard}>
              <RetroIcon name="calendar" size={28} color={Colors.editorial.brightYellow} />
              <Text style={styles.tipTitle}>PLAN AHEAD</Text>
              <Text style={styles.tipText}>
                RESEARCH YOUR LAYOVER CITY BEFORE YOU ARRIVE TO MAKE THE MOST OF YOUR TIME.
              </Text>
            </View>
            <View style={styles.tipCard}>
              <RetroIcon name="clock" size={28} color={Colors.editorial.mint} />
              <Text style={styles.tipTitle}>TIME MANAGEMENT</Text>
              <Text style={styles.tipText}>
                ALWAYS ALLOW EXTRA TIME FOR SECURITY AND TRAVEL BACK TO THE AIRPORT.
              </Text>
            </View>
            <View style={styles.tipCard}>
              <RetroIcon name="backpack" size={28} color={Colors.editorial.lavender} />
              <Text style={styles.tipTitle}>TRAVEL LIGHT</Text>
              <Text style={styles.tipText}>
                CONSIDER LUGGAGE STORAGE AT THE AIRPORT IF YOU PLAN TO EXPLORE EXTENSIVELY.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.editorial.cream,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: Layout.padding.screen,
    paddingBottom: Layout.spacing.lg,
    alignItems: 'center',
  },
  masthead: {
    fontSize: 36,
    fontWeight: '900',
    color: Colors.editorial.navy,
    marginBottom: Layout.spacing.sm,
    letterSpacing: 4,
    textAlign: 'center',
  },
  tagline: {
    fontSize: Layout.fontSize.sm,
    color: Colors.editorial.warmGray,
    textAlign: 'center',
    letterSpacing: 2,
    fontWeight: '600',
    marginBottom: Layout.spacing.md,
  },
  headerAccent: {
    width: 60,
    height: 4,
    backgroundColor: Colors.editorial.coral,
    marginTop: Layout.spacing.sm,
  },
  welcomeSection: {
    paddingHorizontal: Layout.padding.screen,
    marginBottom: Layout.spacing.lg,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: Layout.fontSize.lg,
    color: Colors.editorial.navy,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
  },
  flightCard: {
    margin: Layout.margins.screen,
    padding: Layout.padding.card,
    backgroundColor: Colors.editorial.lightCream,
    borderRadius: 0,
    borderWidth: 3,
    borderColor: Colors.editorial.navy,
    shadowColor: Colors.editorial.navy,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
  },
  cardTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: '900',
    color: Colors.editorial.navy,
    letterSpacing: 2,
  },
  editorialAccent: {
    width: 40,
    height: 3,
    backgroundColor: Colors.editorial.skyBlue,
    marginBottom: Layout.spacing.md,
  },
  flightInfo: {
    marginBottom: Layout.spacing.lg,
  },
  flightText: {
    fontSize: Layout.fontSize.md,
    color: Colors.editorial.navy,
    marginBottom: Layout.spacing.sm,
    fontWeight: '700',
    letterSpacing: 1,
  },
  timeText: {
    fontSize: Layout.fontSize.sm,
    color: Colors.editorial.warmGray,
    marginBottom: Layout.spacing.md,
    fontWeight: '600',
    letterSpacing: 1,
  },
  timeCalculation: {
    marginTop: Layout.spacing.md,
  },
  usableTime: {
    fontSize: Layout.fontSize.md,
    color: Colors.editorial.skyBlue,
    fontWeight: '900',
    marginBottom: Layout.spacing.sm,
    letterSpacing: 1,
  },
  warning: {
    fontSize: Layout.fontSize.sm,
    color: Colors.editorial.coral,
    fontWeight: '700',
    letterSpacing: 1,
  },
  warningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
    marginBottom: Layout.spacing.xs,
  },
  emptyState: {
    margin: Layout.margins.screen,
    padding: Layout.padding.card,
    backgroundColor: Colors.editorial.lightCream,
    borderRadius: 0,
    borderWidth: 3,
    borderColor: Colors.editorial.navy,
    alignItems: 'center',
    shadowColor: Colors.editorial.navy,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 8,
  },
  emptySubtitle: {
    fontSize: Layout.fontSize.md,
    color: Colors.editorial.warmGray,
    textAlign: 'center',
    marginBottom: Layout.spacing.lg,
    fontWeight: '600',
    letterSpacing: 1,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: Colors.editorial.skyBlue,
    paddingHorizontal: Layout.spacing.xl,
    paddingVertical: Layout.spacing.lg,
    borderRadius: 0,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.editorial.navy,
    shadowColor: Colors.editorial.navy,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 6,
  },
  primaryButtonText: {
    color: Colors.editorial.navy,
    fontSize: Layout.fontSize.md,
    fontWeight: '900',
    letterSpacing: 2,
  },
  actionSection: {
    padding: Layout.padding.screen,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.xl,
    fontWeight: '900',
    color: Colors.editorial.navy,
    marginBottom: Layout.spacing.lg,
    textAlign: 'center',
    letterSpacing: 3,
  },
  actionGrid: {
    gap: Layout.spacing.md,
  },
  actionButton: {
    backgroundColor: Colors.editorial.lightCream,
    padding: Layout.padding.card,
    borderRadius: 0,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.editorial.navy,
    shadowColor: Colors.editorial.navy,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 6,
    minHeight: 120,
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: Layout.fontSize.sm,
    fontWeight: '900',
    color: Colors.editorial.navy,
    textAlign: 'center',
    letterSpacing: 1,
    marginTop: Layout.spacing.sm,
    lineHeight: 18,
  },
  tipsSection: {
    padding: Layout.padding.screen,
    paddingTop: Layout.spacing.md,
  },
  tipsGrid: {
    gap: Layout.spacing.md,
  },
  tipCard: {
    backgroundColor: Colors.editorial.lightCream,
    padding: Layout.padding.card,
    borderRadius: 0,
    borderWidth: 2,
    borderColor: Colors.editorial.navy,
    shadowColor: Colors.editorial.navy,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 4,
    alignItems: 'center',
  },
  tipTitle: {
    fontSize: Layout.fontSize.md,
    fontWeight: '900',
    color: Colors.editorial.navy,
    marginBottom: Layout.spacing.sm,
    textAlign: 'center',
    letterSpacing: 2,
  },
  tipText: {
    fontSize: Layout.fontSize.sm,
    color: Colors.editorial.warmGray,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
}); 