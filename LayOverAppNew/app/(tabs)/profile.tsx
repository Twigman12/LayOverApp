import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@/context/UserContext';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';

export default function ProfileScreen() {
  const { state, logout } = useUser();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [locationEnabled, setLocationEnabled] = React.useState(true);

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>
            Manage your account and preferences
          </Text>
        </View>

        {/* User Info */}
        {state.currentUser ? (
          <View style={styles.userCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {state.currentUser.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.userName}>{state.currentUser.name}</Text>
            <Text style={styles.userEmail}>{state.currentUser.email}</Text>
          </View>
        ) : (
          <View style={styles.loginPrompt}>
            <Text style={styles.loginTitle}>Welcome to LayOver</Text>
            <Text style={styles.loginSubtitle}>
              Sign in to save your preferences and itineraries
            </Text>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Push Notifications</Text>
              <Text style={styles.settingSubtitle}>Get updates about your flights</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: Colors.gray300, true: Colors.primary }}
              thumbColor={Colors.white}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Location Services</Text>
              <Text style={styles.settingSubtitle}>Find nearby attractions</Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: Colors.gray300, true: Colors.primary }}
              thumbColor={Colors.white}
            />
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Preferences</Text>
              <Text style={styles.settingSubtitle}>Customize your experience</Text>
            </View>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Help & Support</Text>
              <Text style={styles.settingSubtitle}>Get help and contact us</Text>
            </View>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfoSection}>
          <Text style={styles.sectionTitle}>App Information</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Build</Text>
            <Text style={styles.infoValue}>2024.1.0</Text>
          </View>
        </View>

        {/* Logout */}
        {state.currentUser && (
          <View style={styles.logoutSection}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}
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
  userCard: {
    margin: Layout.margins.screen,
    padding: Layout.padding.card,
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.lg,
    alignItems: 'center',
    ...Layout.shadows.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  avatarText: {
    fontSize: Layout.fontSize.xxxl,
    fontWeight: 'bold',
    color: Colors.white,
  },
  userName: {
    fontSize: Layout.fontSize.xl,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.xs,
  },
  userEmail: {
    fontSize: Layout.fontSize.md,
    color: Colors.textSecondary,
  },
  loginPrompt: {
    margin: Layout.margins.screen,
    padding: Layout.padding.card,
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius.lg,
    alignItems: 'center',
    ...Layout.shadows.md,
  },
  loginTitle: {
    fontSize: Layout.fontSize.xl,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.sm,
  },
  loginSubtitle: {
    fontSize: Layout.fontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Layout.spacing.lg,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
  },
  settingsSection: {
    padding: Layout.padding.screen,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: Layout.padding.card,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.sm,
    ...Layout.shadows.sm,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Layout.spacing.xs,
  },
  settingSubtitle: {
    fontSize: Layout.fontSize.sm,
    color: Colors.textSecondary,
  },
  settingArrow: {
    fontSize: Layout.fontSize.lg,
    color: Colors.textSecondary,
    fontWeight: 'bold',
  },
  appInfoSection: {
    padding: Layout.padding.screen,
    paddingTop: Layout.spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: Layout.padding.card,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.spacing.sm,
    ...Layout.shadows.sm,
  },
  infoLabel: {
    fontSize: Layout.fontSize.md,
    color: Colors.textPrimary,
  },
  infoValue: {
    fontSize: Layout.fontSize.md,
    color: Colors.textSecondary,
  },
  logoutSection: {
    padding: Layout.padding.screen,
    paddingTop: Layout.spacing.md,
  },
  logoutButton: {
    backgroundColor: Colors.error,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: Colors.white,
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
  },
}); 