import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFlight } from '@/context/FlightContext';
import { FlightInput } from '@/types/flight';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { RetroIcon } from '@/components/RetroIcons';
import { autoFillFlightData } from '@/services/api/flights';

export default function FlightInputScreen() {
  const router = useRouter();
  const { setFlightInput, setError } = useFlight();
  
  const [formData, setFormData] = useState<FlightInput>({
    flightNumber: '',
    layoverCity: '',
    arrivalTime: '',
    departureTime: '',
    isInternational: false,
    timezone: 'UTC',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof FlightInput, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFlightNumberChange = async (flightNumber: string) => {
    handleInputChange('flightNumber', flightNumber);
    
    // Auto-fill if flight number is at least 3 characters
    if (flightNumber.length >= 3) {
      setIsLoading(true);
      try {
        const flightData = await autoFillFlightData(flightNumber);
        if (flightData) {
          setFormData(prev => ({
            ...prev,
            ...flightData,
          }));
          Alert.alert('FLIGHT FOUND', 'FLIGHT INFORMATION HAS BEEN AUTO-FILLED');
        }
      } catch (error) {
        console.error('Error auto-filling flight data:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.flightNumber || !formData.layoverCity || !formData.arrivalTime || !formData.departureTime) {
      Alert.alert('MISSING INFORMATION', 'PLEASE FILL IN ALL REQUIRED FIELDS');
      return;
    }

    // Update flight context
    setFlightInput(formData);

    // Navigate back to home
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Editorial Header */}
        <View style={styles.header}>
          <Text style={styles.masthead}>ITINEREADY</Text>
          <Text style={styles.tagline}>ENTER YOUR LAYOVER INFORMATION TO START PLANNING</Text>
          <View style={styles.headerAccent} />
        </View>

        <View style={styles.formSection}>
          {/* Flight Number */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <RetroIcon name="plane" size={20} color={Colors.editorial.navy} />
              <Text style={styles.label}>FLIGHT NUMBER</Text>
              {isLoading && (
                <RetroIcon name="loading" size={16} color={Colors.editorial.skyBlue} />
              )}
            </View>
            <TextInput
              style={styles.input}
              placeholder="ENTER FLIGHT NUMBER (E.G., AA123)"
              placeholderTextColor={Colors.editorial.warmGray}
              value={formData.flightNumber}
              onChangeText={handleFlightNumberChange}
              autoCapitalize="characters"
            />
          </View>

          {/* Layover City */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <RetroIcon name="plane" size={20} color={Colors.editorial.navy} />
              <Text style={styles.label}>LAYOVER CITY (AIRPORT CODE)</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="ENTER AIRPORT CODE (E.G., JFK)"
              placeholderTextColor={Colors.editorial.warmGray}
              value={formData.layoverCity}
              onChangeText={(text) => handleInputChange('layoverCity', text)}
              autoCapitalize="characters"
            />
          </View>

          {/* Arrival Time */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <RetroIcon name="clock" size={20} color={Colors.editorial.coral} />
              <Text style={styles.label}>ARRIVAL TIME</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="ENTER ARRIVAL TIME (E.G., 14:30)"
              placeholderTextColor={Colors.editorial.warmGray}
              value={formData.arrivalTime}
              onChangeText={(text) => handleInputChange('arrivalTime', text)}
            />
          </View>

          {/* Departure Time */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <RetroIcon name="clock" size={20} color={Colors.editorial.coral} />
              <Text style={styles.label}>DEPARTURE TIME</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="ENTER DEPARTURE TIME (E.G., 16:45)"
              placeholderTextColor={Colors.editorial.warmGray}
              value={formData.departureTime}
              onChangeText={(text) => handleInputChange('departureTime', text)}
            />
          </View>

          {/* International Flight */}
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <RetroIcon name="globe" size={20} color={Colors.editorial.navy} />
              <Text style={styles.label}>FLIGHT TYPE</Text>
            </View>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={[
                  styles.radioOption,
                  !formData.isInternational && styles.radioOptionSelected,
                ]}
                onPress={() => handleInputChange('isInternational', false)}
              >
                <View style={[
                  styles.radioButton,
                  !formData.isInternational && styles.radioButtonSelected,
                ]}>
                  <View style={styles.radioButtonInner} />
                </View>
                <Text style={[
                  styles.radioLabel,
                  !formData.isInternational && styles.radioTextSelected,
                ]}>
                  DOMESTIC
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.radioOption,
                  formData.isInternational && styles.radioOptionSelected,
                ]}
                onPress={() => handleInputChange('isInternational', true)}
              >
                <View style={[
                  styles.radioButton,
                  formData.isInternational && styles.radioButtonSelected,
                ]}>
                  <View style={styles.radioButtonInner} />
                </View>
                <Text style={[
                  styles.radioLabel,
                  formData.isInternational && styles.radioTextSelected,
                ]}>
                  INTERNATIONAL
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>SUBMIT FLIGHT DETAILS</Text>
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoHeader}>
            <RetroIcon name="lightbulb" size={24} color={Colors.editorial.coral} />
            <Text style={styles.infoTitle}>TIPS</Text>
          </View>
          <Text style={styles.infoText}>
            ENTER YOUR FLIGHT NUMBER TO AUTO-FILL FLIGHT INFORMATION. 
            THE SYSTEM WILL FETCH LAYOVER CITY, ARRIVAL TIME, AND DEPARTURE TIME 
            FROM THE AVIATION DATABASE.
          </Text>
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
  formSection: {
    padding: Layout.padding.screen,
  },
  inputGroup: {
    marginBottom: Layout.spacing.lg,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
    marginBottom: Layout.spacing.sm,
  },
  label: {
    fontSize: Layout.fontSize.md,
    fontWeight: '900',
    color: Colors.editorial.navy,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: Colors.editorial.lightCream,
    borderWidth: 3,
    borderColor: Colors.editorial.navy,
    borderRadius: 0,
    padding: Layout.padding.input,
    fontSize: Layout.fontSize.md,
    color: Colors.editorial.navy,
    fontWeight: '600',
    letterSpacing: 1,
    shadowColor: Colors.editorial.navy,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 4,
  },
  radioGroup: {
    marginTop: Layout.spacing.sm,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
    backgroundColor: Colors.editorial.lightCream,
    padding: Layout.padding.sm,
    borderRadius: 0,
    borderWidth: 2,
    borderColor: Colors.editorial.navy,
    shadowColor: Colors.editorial.navy,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 2,
  },
  radioOptionSelected: {
    backgroundColor: Colors.editorial.skyBlue,
    borderColor: Colors.editorial.navy,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.editorial.navy,
    marginRight: Layout.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    backgroundColor: Colors.editorial.navy,
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.editorial.lightCream,
  },
  radioLabel: {
    fontSize: Layout.fontSize.md,
    color: Colors.editorial.navy,
    fontWeight: '700',
    letterSpacing: 1,
  },
  submitButton: {
    backgroundColor: Colors.editorial.skyBlue,
    paddingVertical: Layout.spacing.lg,
    borderRadius: 0,
    alignItems: 'center',
    marginTop: Layout.spacing.xl,
    borderWidth: 3,
    borderColor: Colors.editorial.navy,
    shadowColor: Colors.editorial.navy,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 8,
  },
  submitButtonText: {
    color: Colors.editorial.navy,
    fontSize: Layout.fontSize.lg,
    fontWeight: '900',
    letterSpacing: 3,
  },
  infoSection: {
    padding: Layout.padding.screen,
    paddingTop: Layout.spacing.md,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
    marginBottom: Layout.spacing.md,
  },
  infoTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: '900',
    color: Colors.editorial.navy,
    letterSpacing: 2,
  },
  infoText: {
    fontSize: Layout.fontSize.md,
    color: Colors.editorial.warmGray,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
}); 