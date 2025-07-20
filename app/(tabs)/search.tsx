import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All', icon: '🏛️' },
    { id: 'museum', name: 'Museums', icon: '🏛️' },
    { id: 'park', name: 'Parks', icon: '🌳' },
    { id: 'restaurant', name: 'Restaurants', icon: '🍽️' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️' },
    { id: 'historical', name: 'Historical', icon: '🏛️' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎭' },
  ];

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery, 'in category:', selectedCategory);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Discover Places</Text>
          <Text style={styles.subtitle}>
            Find amazing attractions near your layover
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for places..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>🔍</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesList}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category.id && styles.categoryButtonSelected,
                  ]}
                  onPress={() => handleCategorySelect(category.id)}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.categoryTextSelected,
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Quick Suggestions */}
        <View style={styles.suggestionsSection}>
          <Text style={styles.sectionTitle}>Popular Near Airports</Text>
          
          <View style={styles.suggestionCard}>
            <Text style={styles.suggestionTitle}>🏛️ Metropolitan Museum of Art</Text>
            <Text style={styles.suggestionSubtitle}>Art & Culture • 2 hours</Text>
            <Text style={styles.suggestionDistance}>~30 min from JFK</Text>
          </View>

          <View style={styles.suggestionCard}>
            <Text style={styles.suggestionTitle}>🌳 Central Park</Text>
            <Text style={styles.suggestionSubtitle}>Nature & Recreation • 1.5 hours</Text>
            <Text style={styles.suggestionDistance}>~25 min from JFK</Text>
          </View>

          <View style={styles.suggestionCard}>
            <Text style={styles.suggestionTitle}>🍽️ Times Square</Text>
            <Text style={styles.suggestionSubtitle}>Entertainment • 1 hour</Text>
            <Text style={styles.suggestionDistance}>~35 min from JFK</Text>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersSection}>
          <Text style={styles.sectionTitle}>Filters</Text>
          
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Max Distance:</Text>
            <View style={styles.filterOptions}>
              <TouchableOpacity style={styles.filterOption}>
                <Text style={styles.filterOptionText}>5km</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.filterOption, styles.filterOptionSelected]}>
                <Text style={styles.filterOptionText}>10km</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOption}>
                <Text style={styles.filterOptionText}>20km</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Max Time:</Text>
            <View style={styles.filterOptions}>
              <TouchableOpacity style={styles.filterOption}>
                <Text style={styles.filterOptionText}>30min</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.filterOption, styles.filterOptionSelected]}>
                <Text style={styles.filterOptionText}>1h</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOption}>
                <Text style={styles.filterOptionText}>2h+</Text>
              </TouchableOpacity>
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
  searchSection: {
    paddingHorizontal: Layout.padding.screen,
    marginBottom: Layout.spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    padding: Layout.padding.input,
    fontSize: Layout.fontSize.md,
    color: Colors.textPrimary,
  },
  searchButton: {
    backgroundColor: Colors.primary,
    padding: Layout.padding.input,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: Layout.fontSize.md,
    color: Colors.white,
  },
  categoriesSection: {
    marginBottom: Layout.spacing.lg,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.md,
    paddingHorizontal: Layout.padding.screen,
  },
  categoriesList: {
    flexDirection: 'row',
    paddingHorizontal: Layout.padding.screen,
    gap: Layout.spacing.sm,
  },
  categoryButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    minWidth: 80,
  },
  categoryButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryIcon: {
    fontSize: Layout.fontSize.lg,
    marginBottom: Layout.spacing.xs,
  },
  categoryText: {
    fontSize: Layout.fontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: Colors.white,
  },
  suggestionsSection: {
    paddingHorizontal: Layout.padding.screen,
    marginBottom: Layout.spacing.lg,
  },
  suggestionCard: {
    backgroundColor: Colors.white,
    padding: Layout.padding.card,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.md,
    ...Layout.shadows.sm,
  },
  suggestionTitle: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.xs,
  },
  suggestionSubtitle: {
    fontSize: Layout.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.xs,
  },
  suggestionDistance: {
    fontSize: Layout.fontSize.sm,
    color: Colors.primary,
    fontWeight: '500',
  },
  filtersSection: {
    paddingHorizontal: Layout.padding.screen,
    paddingBottom: Layout.spacing.lg,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  filterLabel: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    width: 100,
  },
  filterOptions: {
    flexDirection: 'row',
    gap: Layout.spacing.sm,
  },
  filterOption: {
    backgroundColor: Colors.white,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterOptionSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterOptionText: {
    fontSize: Layout.fontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
}); 