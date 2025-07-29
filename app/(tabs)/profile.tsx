import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@/context/UserContext';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { RetroIcon } from '@/components/RetroIcons';

export default function ProfileScreen() {
  const { state, logout } = useUser();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [locationEnabled, setLocationEnabled] = React.useState(true);

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Editorial Header */}
        <View style={styles.header}>
          <Text style={styles.masthead}>ITINEREADY</Text>
          <Text style={styles.tagline}>MANAGE YOUR ACCOUNT AND PREFERENCES</Text>
          <View style={styles.headerAccent} />
        </View>

        {/* User Info */}
        {state.currentUser ? (
          <View style={styles.userCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {state.currentUser.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.userName}>{state.currentUser.name.toUpperCase()}</Text>
            <Text style={styles.userEmail}>{state.currentUser.email.toUpperCase()}</Text>
          </View>
        ) : (
          <View style={styles.loginPrompt}>
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleRow}>
                <RetroIcon name="person" size={24} color={Colors.editorial.coral} />
                <Text style={styles.cardTitle}>WELCOME TO LAYOVER</Text>
              </View>
              <View style={styles.editorialAccent} />
            </View>
            <Text style={styles.loginSubtitle}>
              SIGN IN TO SAVE YOUR PREFERENCES AND ITINERARIES
            </Text>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>SIGN IN</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>SETTINGS</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingHeader}>
                <RetroIcon name="notification" size={20} color={Colors.editorial.deepTeal} />
                <Text style={styles.settingTitle}>PUSH NOTIFICATIONS</Text>
              </View>
              <Text style={styles.settingSubtitle}>GET UPDATES ABOUT YOUR FLIGHTS</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: Colors.editorial.warmGray, true: Colors.editorial.deepTeal }}
              thumbColor={Colors.editorial.lightCream}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingHeader}>
                <RetroIcon name="location" size={20} color={Colors.editorial.mint} />
                <Text style={styles.settingTitle}>LOCATION SERVICES</Text>
              </View>
              <Text style={styles.settingSubtitle}>FIND NEARBY ATTRACTIONS</Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: Colors.editorial.warmGray, true: Colors.editorial.mint }}
              thumbColor={Colors.editorial.lightCream}
            />
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingHeader}>
                <RetroIcon name="settings" size={20} color={Colors.editorial.coral} />
                <Text style={styles.settingTitle}>PREFERENCES</Text>
              </View>
              <Text style={styles.settingSubtitle}>CUSTOMIZE YOUR EXPERIENCE</Text>
            </View>
            <RetroIcon name="arrow" size={20} color={Colors.editorial.warmGray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={styles.settingHeader}>
                <RetroIcon name="info" size={20} color={Colors.editorial.lavender} />
                <Text style={styles.settingTitle}>HELP & SUPPORT</Text>
              </View>
              <Text style={styles.settingSubtitle}>GET HELP AND CONTACT US</Text>
            </View>
            <RetroIcon name="arrow" size={20} color={Colors.editorial.warmGray} />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfoSection}>
          <Text style={styles.sectionTitle}>APP INFORMATION</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>VERSION</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>BUILD</Text>
            <Text style={styles.infoValue}>2024.1.0</Text>
          </View>
        </View>

        {/* Logout */}
        {state.currentUser && (
          <View style={styles.logoutSection}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>SIGN OUT</Text>
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
  userCard: {
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
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 0,
    backgroundColor: Colors.editorial.navy,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
    borderWidth: 3,
    borderColor: Colors.editorial.navy,
  },
  avatarText: {
    fontSize: Layout.fontSize.xxxl,
    fontWeight: '900',
    color: Colors.editorial.lightCream,
    letterSpacing: 2,
  },
  userName: {
    fontSize: Layout.fontSize.xl,
    fontWeight: '900',
    color: Colors.editorial.navy,
    marginBottom: Layout.spacing.xs,
    letterSpacing: 2,
  },
  userEmail: {
    fontSize: Layout.fontSize.md,
    color: Colors.editorial.warmGray,
    fontWeight: '600',
    letterSpacing: 1,
  },
  loginPrompt: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
    width: '100%',
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
  loginSubtitle: {
    fontSize: Layout.fontSize.md,
    color: Colors.editorial.warmGray,
    textAlign: 'center',
    marginBottom: Layout.spacing.lg,
    fontWeight: '600',
    letterSpacing: 1,
    lineHeight: 20,
  },
  loginButton: {
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
  loginButtonText: {
    color: Colors.editorial.navy,
    fontSize: Layout.fontSize.md,
    fontWeight: '900',
    letterSpacing: 2,
  },
  settingsSection: {
    padding: Layout.padding.screen,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: '900',
    color: Colors.editorial.navy,
    marginBottom: Layout.spacing.md,
    letterSpacing: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.editorial.lightCream,
    padding: Layout.padding.card,
    borderRadius: 0,
    borderWidth: 2,
    borderColor: Colors.editorial.navy,
    marginBottom: Layout.spacing.sm,
    shadowColor: Colors.editorial.navy,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 4,
  },
  settingInfo: {
    flex: 1,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
    marginBottom: Layout.spacing.xs,
  },
  settingTitle: {
    fontSize: Layout.fontSize.md,
    fontWeight: '900',
    color: Colors.editorial.navy,
    letterSpacing: 1,
  },
  settingSubtitle: {
    fontSize: Layout.fontSize.sm,
    color: Colors.editorial.warmGray,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  appInfoSection: {
    padding: Layout.padding.screen,
    paddingTop: Layout.spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.editorial.lightCream,
    padding: Layout.padding.card,
    borderRadius: 0,
    borderWidth: 2,
    borderColor: Colors.editorial.navy,
    marginBottom: Layout.spacing.sm,
    shadowColor: Colors.editorial.navy,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 4,
  },
  infoLabel: {
    fontSize: Layout.fontSize.md,
    color: Colors.editorial.navy,
    fontWeight: '700',
    letterSpacing: 1,
  },
  infoValue: {
    fontSize: Layout.fontSize.md,
    color: Colors.editorial.warmGray,
    fontWeight: '600',
    letterSpacing: 1,
  },
  logoutSection: {
    padding: Layout.padding.screen,
    paddingTop: Layout.spacing.md,
  },
  logoutButton: {
    backgroundColor: Colors.editorial.coral,
    paddingVertical: Layout.spacing.md,
    borderRadius: 0,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.editorial.coral,
    shadowColor: Colors.editorial.coral,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 6,
  },
  logoutButtonText: {
    color: Colors.editorial.lightCream,
    fontSize: Layout.fontSize.md,
    fontWeight: '900',
    letterSpacing: 2,
  },
}); 