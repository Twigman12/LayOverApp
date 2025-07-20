import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useItinerary } from '@/context/ItineraryContext';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

export default function ItineraryScreen() {
  const router = useRouter();
  const { state } = useItinerary();

  const handleCreateItinerary = () => {
    router.push('/itinerary-builder');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>My Itineraries</Text>
          <Text style={styles.subtitle}>
            Plan and manage your layover adventures
          </Text>
        </View>

        {state.currentItinerary ? (
          <View style={styles.itineraryCard}>
            <Text style={styles.cardTitle}>{state.currentItinerary.title}</Text>
            <Text style={styles.cardSubtitle}>
              {state.currentItinerary.items.length} activities planned
            </Text>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No Itineraries Yet</Text>
            <Text style={styles.emptySubtitle}>
              Create your first layover itinerary to get started
            </Text>
            <TouchableOpacity style={styles.createButton} onPress={handleCreateItinerary}>
              <Text style={styles.createButtonText}>Create Itinerary</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity style={styles.actionCard} onPress={handleCreateItinerary}>
            <Text style={styles.actionTitle}>➕ Create New</Text>
            <Text style={styles.actionSubtitle}>Start planning a new layover</Text>
          </TouchableOpacity>
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
    paddingBottom: Layout.spacing.lg,
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
  itineraryCard: {
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
    marginBottom: Layout.spacing.xs,
  },
  cardSubtitle: {
    fontSize: Layout.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.md,
  },
  viewButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
  },
  viewButtonText: {
    color: Colors.white,
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
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
  createButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
  },
  createButtonText: {
    color: Colors.white,
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
  },
  quickActions: {
    padding: Layout.padding.screen,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.md,
  },
  actionCard: {
    backgroundColor: Colors.white,
    padding: Layout.padding.card,
    borderRadius: Layout.borderRadius.md,
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
}); 