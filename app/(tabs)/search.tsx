import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { RetroIcon } from '@/components/RetroIcons';

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'ALL', icon: 'map' },
    { id: 'museum', name: 'MUSEUMS', icon: 'book' },
    { id: 'park', name: 'PARKS', icon: 'tree' },
    { id: 'restaurant', name: 'RESTAURANTS', icon: 'food' },
    { id: 'shopping', name: 'SHOPPING', icon: 'star' },
    { id: 'historical', name: 'HISTORICAL', icon: 'camera' },
    { id: 'entertainment', name: 'ENTERTAINMENT', icon: 'party' },
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
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Editorial Header */}
        <View style={styles.header}>
          <Text style={styles.masthead}>ITINEREADY</Text>
          <Text style={styles.tagline}>FIND AMAZING ATTRACTIONS NEAR YOUR LAYOVER</Text>
          <View style={styles.headerAccent} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="SEARCH FOR PLACES..."
              placeholderTextColor={Colors.editorial.warmGray}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <RetroIcon name="search" size={20} color={Colors.editorial.lightCream} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>CATEGORIES</Text>
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
                  <RetroIcon 
                    name={category.icon} 
                    size={24} 
                    color={selectedCategory === category.id ? Colors.editorial.lightCream : Colors.editorial.mutedBlack} 
                  />
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
          <Text style={styles.sectionTitle}>POPULAR NEAR AIRPORTS</Text>
          
          <View style={styles.suggestionCard}>
            <View style={styles.suggestionHeader}>
              <RetroIcon name="book" size={24} color={Colors.editorial.deepTeal} />
              <Text style={styles.suggestionTitle}>METROPOLITAN MUSEUM OF ART</Text>
            </View>
            <Text style={styles.suggestionSubtitle}>ART & CULTURE • 2 HOURS</Text>
            <Text style={styles.suggestionDistance}>~30 MIN FROM JFK</Text>
          </View>

          <View style={styles.suggestionCard}>
            <View style={styles.suggestionHeader}>
              <RetroIcon name="tree" size={24} color={Colors.editorial.mint} />
              <Text style={styles.suggestionTitle}>CENTRAL PARK</Text>
            </View>
            <Text style={styles.suggestionSubtitle}>NATURE & RECREATION • 1.5 HOURS</Text>
            <Text style={styles.suggestionDistance}>~25 MIN FROM JFK</Text>
          </View>

          <View style={styles.suggestionCard}>
            <View style={styles.suggestionHeader}>
              <RetroIcon name="party" size={24} color={Colors.editorial.coral} />
              <Text style={styles.suggestionTitle}>TIMES SQUARE</Text>
            </View>
            <Text style={styles.suggestionSubtitle}>ENTERTAINMENT • 1 HOUR</Text>
            <Text style={styles.suggestionDistance}>~35 MIN FROM JFK</Text>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersSection}>
          <Text style={styles.sectionTitle}>FILTERS</Text>
          
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>MAX DISTANCE:</Text>
            <View style={styles.filterOptions}>
              <TouchableOpacity style={styles.filterOption}>
                <Text style={styles.filterOptionText}>5KM</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.filterOption, styles.filterOptionSelected]}>
                <Text style={styles.filterOptionText}>10KM</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOption}>
                <Text style={styles.filterOptionText}>20KM</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>MAX TIME:</Text>
            <View style={styles.filterOptions}>
              <TouchableOpacity style={styles.filterOption}>
                <Text style={styles.filterOptionText}>30MIN</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.filterOption, styles.filterOptionSelected]}>
                <Text style={styles.filterOptionText}>1H</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOption}>
                <Text style={styles.filterOptionText}>2H+</Text>
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
  searchSection: {
    paddingHorizontal: Layout.padding.screen,
    marginBottom: Layout.spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: Colors.editorial.lightCream,
    borderRadius: 0,
    borderWidth: 3,
    borderColor: Colors.editorial.navy,
    overflow: 'hidden',
    shadowColor: Colors.editorial.navy,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 6,
  },
  searchInput: {
    flex: 1,
    padding: Layout.padding.input,
    fontSize: Layout.fontSize.md,
    color: Colors.editorial.navy,
    fontWeight: '600',
    letterSpacing: 1,
  },
  searchButton: {
    backgroundColor: Colors.editorial.skyBlue,
    padding: Layout.padding.input,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesSection: {
    marginBottom: Layout.spacing.lg,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: '900',
    color: Colors.editorial.navy,
    marginBottom: Layout.spacing.md,
    paddingHorizontal: Layout.padding.screen,
    letterSpacing: 2,
  },
  categoriesList: {
    flexDirection: 'row',
    paddingHorizontal: Layout.padding.screen,
    gap: Layout.spacing.sm,
  },
  categoryButton: {
    backgroundColor: Colors.editorial.lightCream,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderRadius: 0,
    borderWidth: 2,
    borderColor: Colors.editorial.navy,
    alignItems: 'center',
    minWidth: 100,
    shadowColor: Colors.editorial.navy,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 4,
  },
  categoryButtonSelected: {
    backgroundColor: Colors.editorial.skyBlue,
    borderColor: Colors.editorial.navy,
  },
  categoryText: {
    fontSize: Layout.fontSize.sm,
    color: Colors.editorial.navy,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: Layout.spacing.xs,
  },
  categoryTextSelected: {
    color: Colors.editorial.navy,
  },
  suggestionsSection: {
    paddingHorizontal: Layout.padding.screen,
    marginBottom: Layout.spacing.lg,
  },
  suggestionCard: {
    backgroundColor: Colors.editorial.lightCream,
    padding: Layout.padding.card,
    borderRadius: 0,
    marginBottom: Layout.spacing.md,
    borderWidth: 2,
    borderColor: Colors.editorial.navy,
    shadowColor: Colors.editorial.navy,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 4,
  },
  suggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
    marginBottom: Layout.spacing.sm,
  },
  suggestionTitle: {
    fontSize: Layout.fontSize.md,
    fontWeight: '900',
    color: Colors.editorial.navy,
    letterSpacing: 1,
  },
  suggestionSubtitle: {
    fontSize: Layout.fontSize.sm,
    color: Colors.editorial.warmGray,
    marginBottom: Layout.spacing.xs,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  suggestionDistance: {
    fontSize: Layout.fontSize.sm,
    color: Colors.editorial.skyBlue,
    fontWeight: '700',
    letterSpacing: 1,
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
    fontWeight: '700',
    color: Colors.editorial.navy,
    width: 120,
    letterSpacing: 1,
  },
  filterOptions: {
    flexDirection: 'row',
    gap: Layout.spacing.sm,
  },
  filterOption: {
    backgroundColor: Colors.editorial.lightCream,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderRadius: 0,
    borderWidth: 2,
    borderColor: Colors.editorial.navy,
    shadowColor: Colors.editorial.navy,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 2,
  },
  filterOptionSelected: {
    backgroundColor: Colors.editorial.skyBlue,
    borderColor: Colors.editorial.navy,
  },
  filterOptionText: {
    fontSize: Layout.fontSize.sm,
    color: Colors.editorial.navy,
    fontWeight: '700',
    letterSpacing: 1,
  },
}); 