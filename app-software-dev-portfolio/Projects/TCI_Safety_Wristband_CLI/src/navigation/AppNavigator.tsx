import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AlertTriangle, Map, Settings, Shield, Users } from 'lucide-react-native';
import WristbandScreen from '../screens/WristbandScreen';

// Placeholder screens
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

// Placeholder components for other tabs
const MapScreen = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>Safety Map</Text>
      <Text style={styles.subtitle}>Real-time location tracking</Text>
      <Text style={styles.comingSoon}>Map View Coming Soon</Text>
    </View>
  </SafeAreaView>
);

const TeamScreen = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>Team Management</Text>
      <Text style={styles.subtitle}>Emergency response team</Text>
      <Text style={styles.comingSoon}>Team Features Coming Soon</Text>
    </View>
  </SafeAreaView>
);

const EvidenceScreen = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>Evidence Tracker</Text>
      <Text style={styles.subtitle}>Emergency incident records</Text>
      <Text style={styles.comingSoon}>Evidence Features Coming Soon</Text>
    </View>
  </SafeAreaView>
);

const SettingsScreen = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>App configuration</Text>
      <Text style={styles.comingSoon}>Settings Coming Soon</Text>
    </View>
  </SafeAreaView>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1E293B',
            borderTopColor: '#374151',
            paddingTop: 8,
            paddingBottom: 8,
            height: 70,
          },
          tabBarActiveTintColor: '#3B82F6',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 4,
          },
        }}>
        <Tab.Screen
          name="Safety"
          component={WristbandScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <AlertTriangle size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Map size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Team"
          component={TeamScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Users size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Evidence"
          component={EvidenceScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Shield size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Settings size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 20,
  },
  comingSoon: {
    fontSize: 18,
    color: '#64748B',
    textAlign: 'center',
  },
}); 