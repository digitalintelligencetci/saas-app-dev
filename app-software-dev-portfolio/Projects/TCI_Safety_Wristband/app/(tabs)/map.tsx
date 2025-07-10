import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Map } from 'lucide-react-native';

export default function MapScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Map size={32} color="#3B82F6" />
        <Text style={styles.title}>Safety Map</Text>
        <Text style={styles.subtitle}>Real-time location tracking</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.comingSoon}>Map View Coming Soon</Text>
        <Text style={styles.description}>
          Real-time GPS tracking and location monitoring for all connected wristbands.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginTop: 12,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  comingSoon: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 24,
  },
}); 