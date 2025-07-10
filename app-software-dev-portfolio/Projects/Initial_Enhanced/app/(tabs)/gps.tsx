import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GPSTracker from '@/components/GPSTracker';

interface GPSCoordinate {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string;
  address?: string;
}

export default function GPSScreen() {
  const [locationHistory, setLocationHistory] = useState<GPSCoordinate[]>([]);

  const handleLocationUpdate = (location: GPSCoordinate) => {
    setLocationHistory(prev => [...prev, location].slice(-100)); // Keep last 100 locations
    console.log('Location updated:', location);
  };

  const handleShareLocation = (location: GPSCoordinate) => {
    const locationText = `Current Location:\nLat: ${location.latitude.toFixed(6)}\nLng: ${location.longitude.toFixed(6)}\nAccuracy: ±${location.accuracy.toFixed(1)}m\nTime: ${new Date(location.timestamp).toLocaleString()}`;
    
    Alert.alert(
      'Share Location',
      'Choose sharing method:',
      [
        {
          text: 'Team Chat',
          onPress: () => Alert.alert('Shared', 'Location shared with team members')
        },
        {
          text: 'Evidence Report',
          onPress: () => Alert.alert('Added', 'Location added to current evidence report')
        },
        {
          text: 'Emergency Services',
          onPress: () => Alert.alert('Sent', 'Location sent to emergency dispatch')
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <GPSTracker
        onLocationUpdate={handleLocationUpdate}
        onShareLocation={handleShareLocation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
});