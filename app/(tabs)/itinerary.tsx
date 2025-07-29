import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useItinerary } from '@/context/ItineraryContext';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { RetroIcon } from '@/components/RetroIcons';

export default function ItineraryScreen() {
  const router = useRouter();
  const { state } = useItinerary();

  const handleCreateItinerary = () => {
    router.push('/(tabs)/search');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Editorial Header */}
        <View style={styles.header}>
          <Text style={styles.masthead}>ITINEREADY</Text>
          <Text style={styles.tagline}>PLAN AND MANAGE YOUR LAYOVER ADVENTURES</Text>
          <View style={styles.headerAccent} />
        </View>

        {state.currentItinerary ? (
          <View style={styles.itineraryCard}>
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleRow}>
                <RetroIcon name="list" size={24} color={Colors.editorial.deepTeal} />
                <Text style={styles.cardTitle}>{state.currentItinerary.title.toUpperCase()}</Text>
              </View>
              <View style={styles.editorialAccent} />
            </View>
            <Text style={styles.cardSubtitle}>
              {state.currentItinerary.items.length} ACTIVITIES PLANNED
            </Text>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>VIEW DETAILS</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleRow}>
                <RetroIcon name="list" size={24} color={Colors.editorial.boldOrange} />
                <Text style={styles.cardTitle}>NO ITINERARIES YET</Text>
              </View>
              <View style={styles.editorialAccent} />
            </View>
            <Text style={styles.emptySubtitle}>
              CREATE YOUR FIRST LAYOVER ITINERARY TO GET STARTED
            </Text>
            <TouchableOpacity style={styles.createButton} onPress={handleCreateItinerary}>
              <Text style={styles.createButtonText}>CREATE ITINERARY</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
          <TouchableOpacity style={styles.actionCard} onPress={handleCreateItinerary}>
            <View style={styles.actionHeader}>
              <RetroIcon name="pen" size={24} color={Colors.editorial.coral} />
              <Text style={styles.actionTitle}>➕ CREATE NEW</Text>
            </View>
            <Text style={styles.actionSubtitle}>START PLANNING A NEW LAYOVER</Text>
          </TouchableOpacity>
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
  itineraryCard: {
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
  },
  cardSubtitle: {
    fontSize: Layout.fontSize.sm,
    color: Colors.editorial.warmGray,
    marginBottom: Layout.spacing.lg,
    fontWeight: '600',
    letterSpacing: 1,
  },
  viewButton: {
    backgroundColor: Colors.editorial.skyBlue,
    paddingVertical: Layout.spacing.sm,
    borderRadius: 0,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.editorial.navy,
    shadowColor: Colors.editorial.navy,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 4,
  },
  viewButtonText: {
    color: Colors.editorial.navy,
    fontSize: Layout.fontSize.md,
    fontWeight: '900',
    letterSpacing: 2,
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
  createButton: {
    backgroundColor: Colors.editorial.skyBlue,
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    borderRadius: 0,
    borderWidth: 2,
    borderColor: Colors.editorial.navy,
    shadowColor: Colors.editorial.navy,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 6,
  },
  createButtonText: {
    color: Colors.editorial.navy,
    fontSize: Layout.fontSize.md,
    fontWeight: '900',
    letterSpacing: 2,
  },
  quickActions: {
    padding: Layout.padding.screen,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: '900',
    color: Colors.editorial.navy,
    marginBottom: Layout.spacing.md,
    letterSpacing: 2,
  },
  actionCard: {
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
  },
  actionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
    marginBottom: Layout.spacing.sm,
  },
  actionTitle: {
    fontSize: Layout.fontSize.md,
    fontWeight: '900',
    color: Colors.editorial.navy,
    letterSpacing: 1,
  },
  actionSubtitle: {
    fontSize: Layout.fontSize.sm,
    color: Colors.editorial.warmGray,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
}); 