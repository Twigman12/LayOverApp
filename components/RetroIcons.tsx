import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface RetroIconProps {
  name: string;
  size?: number;
  color?: string;
}

export const RetroIcon: React.FC<RetroIconProps> = ({
  name,
  size = 24,
  color = Colors.editorial.navy // Updated default color
}) => {
  const iconMap: { [key: string]: string } = {
    // Navigation
    home: '🏠',
    search: '🔍',
    trips: '📋',
    profile: '👤',
    
    // Flight & Travel
    plane: '✈️',
    warning: '⚠️',
    clock: '🕐',
    calendar: '📅',
    backpack: '🎒',
    
    // Actions
    add: '➕',
    edit: '✏️',
    delete: '🗑️',
    save: '💾',
    share: '📤',
    download: '📥',
    
    // Categories
    museum: '🏛️',
    park: '🌳',
    restaurant: '🍽️',
    shopping: '🛍️',
    entertainment: '🎭',
    cultural: '🎨',
    outdoor: '🏃',
    indoor: '🏢',
    
    // Tips
    list: '📝',
    book: '📚',
    pen: '✏️',
    camera: '📷',
    balloon: '🎈',
    party: '🎉',
    sparkles: '✨',
    fire: '🔥',
    tree: '🌳',
    sun: '☀️',
    coffee: '☕',
    food: '🍽️',
    computer: '💻',
    phone: '📱',
    wifi: '📶',
    settings: '⚙️',
    globe: '🌍',
    world: '🌎',
    arrow: '➡️',
    person: '👤',
    notification: '🔔',
    loading: '⏳',
  };
  
  return (
    <Text style={[styles.icon, { fontSize: size, color }]}>
      {iconMap[name] || '❓'}
    </Text>
  );
};

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
  },
}); 