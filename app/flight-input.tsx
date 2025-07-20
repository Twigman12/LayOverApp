import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFlight } from '@/context/FlightContext';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { FlightInput } from '@/types/flight';

export default function FlightInputScreen() {
  const router = useRouter();
  const { setFlightInput, setError } = useFlight();
  
  const [formData, setFormData] = useState<FlightInput>({
    layoverCity: '',
    arrivalTime: '',
    departureTime: '',
    isInternational: false,
    timezone: 'UTC',
  });

  const handleInputChange = (field: keyof FlightInput, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.layoverCity || !formData.arrivalTime || !formData.departureTime) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const arrivalTime = new Date(formData.arrivalTime);
    const departureTime = new Date(formData.departureTime);

    if (arrivalTime >= departureTime) {
      Alert.alert('Error', 'Departure time must be after arrival time');
      return;
    }

    try {
      setFlightInput(formData);
      router.back();
    } catch (error) {
      setError('Failed to save flight details');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Flight Details</Text>
          <Text style={styles.subtitle}>
            Enter your layover information to start planning
          </Text>
        </View>

        <View style={styles.form}>
          {/* Layover City */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Layover City (Airport Code)</Text>
            <TouchableOpacity style={styles.input}>
              <Text style={styles.inputText}>
                {formData.layoverCity || 'Enter airport code (e.g., JFK, LHR)'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Arrival Time */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Arrival Time</Text>
            <TouchableOpacity style={styles.input}>
              <Text style={styles.inputText}>
                {formData.arrivalTime || 'Select arrival time'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Departure Time */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Departure Time</Text>
            <TouchableOpacity style={styles.input}>
              <Text style={styles.inputText}>
                {formData.departureTime || 'Select departure time'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* International Flight */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Flight Type</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  !formData.isInternational && styles.radioButtonSelected,
                ]}
                onPress={() => handleInputChange('isInternational', false)}
              >
                <Text style={[
                  styles.radioText,
                  !formData.isInternational && styles.radioTextSelected,
                ]}>
                  Domestic
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  formData.isInternational && styles.radioButtonSelected,
                ]}
                onPress={() => handleInputChange('isInternational', true)}
              >
                <Text style={[
                  styles.radioText,
                  formData.isInternational && styles.radioTextSelected,
                ]}>
                  International
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Timezone */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Timezone</Text>
            <TouchableOpacity style={styles.input}>
              <Text style={styles.inputText}>
                {formData.timezone || 'Select timezone'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Save Flight Details</Text>
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>💡 Tips</Text>
          <Text style={styles.infoText}>
            • Use 3-letter airport codes (e.g., JFK, LHR, CDG)
          </Text>
          <Text style={styles.infoText}>
            • International flights require more security buffer time
          </Text>
          <Text style={styles.infoText}>
            • We'll automatically calculate your usable layover time
          </Text>
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
  form: {
    padding: Layout.padding.screen,
  },
  inputGroup: {
    marginBottom: Layout.spacing.lg,
  },
  label: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.sm,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.padding.input,
    minHeight: Layout.heights.input.md,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: Layout.fontSize.md,
    color: Colors.textPrimary,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: Layout.spacing.md,
  },
  radioButton: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.padding.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  radioText: {
    fontSize: Layout.fontSize.md,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  radioTextSelected: {
    color: Colors.white,
  },
  buttonContainer: {
    padding: Layout.padding.screen,
    paddingTop: Layout.spacing.md,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
  },
  infoSection: {
    margin: Layout.margins.screen,
    padding: Layout.padding.card,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Layout.borderRadius.md,
  },
  infoTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.sm,
  },
  infoText: {
    fontSize: Layout.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.xs,
    lineHeight: Layout.lineHeight.relaxed,
  },
}); 