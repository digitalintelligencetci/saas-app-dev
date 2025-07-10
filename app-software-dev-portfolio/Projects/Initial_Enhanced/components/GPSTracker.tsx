import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MapPin, Navigation, Crosshair, Share2, Clock } from 'lucide-react-native';
import * as Location from 'expo-location';

interface GPSCoordinate {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string;
  address?: string;
}

interface GPSTrackerProps {
  onLocationUpdate: (location: GPSCoordinate) => void;
  onShareLocation: (location: GPSCoordinate) => void;
}

export default function GPSTracker({ onLocationUpdate, onShareLocation }: GPSTrackerProps) {
  const [currentLocation, setCurrentLocation] = useState<GPSCoordinate | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [locationHistory, setLocationHistory] = useState<GPSCoordinate[]>([]);
  const [permission, setPermission] = useState<Location.LocationPermissionResponse | null>(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;

    if (isTracking && permission?.granted) {
      startLocationTracking();
    }

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [isTracking, permission]);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermission({ granted: status === 'granted' } as Location.LocationPermissionResponse);
    } catch (error) {
      Alert.alert('Error', 'Failed to request location permission');
    }
  };

  const startLocationTracking = async () => {
    try {
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 5000,
          distanceInterval: 1,
        },
        (location) => {
          const coordinate: GPSCoordinate = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            accuracy: location.coords.accuracy || 0,
            timestamp: new Date().toISOString(),
          };

          setCurrentLocation(coordinate);
          setLocationHistory(prev => [...prev, coordinate].slice(-50)); // Keep last 50 locations
          onLocationUpdate(coordinate);
        }
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to start location tracking');
      setIsTracking(false);
    }
  };

  const getCurrentLocation = async () => {
    if (!permission?.granted) {
      Alert.alert('Permission Required', 'Location permission is required to get current position');
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });

      const coordinate: GPSCoordinate = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        accuracy: location.coords.accuracy || 0,
        timestamp: new Date().toISOString(),
      };

      // Get address from coordinates
      try {
        const addresses = await Location.reverseGeocodeAsync({
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        });

        if (addresses.length > 0) {
          const address = addresses[0];
          coordinate.address = `${address.street || ''} ${address.city || ''} ${address.region || ''}`.trim();
        }
      } catch (error) {
        console.log('Failed to get address:', error);
      }

      setCurrentLocation(coordinate);
      onLocationUpdate(coordinate);
    } catch (error) {
      Alert.alert('Error', 'Failed to get current location');
    }
  };

  const toggleTracking = () => {
    if (!permission?.granted) {
      Alert.alert('Permission Required', 'Location permission is required for tracking');
      return;
    }
    setIsTracking(!isTracking);
  };

  const shareCurrentLocation = () => {
    if (currentLocation) {
      onShareLocation(currentLocation);
    } else {
      Alert.alert('No Location', 'Current location is not available');
    }
  };

  const formatCoordinate = (coord: number, type: 'lat' | 'lng') => {
    const direction = type === 'lat' ? (coord >= 0 ? 'N' : 'S') : (coord >= 0 ? 'E' : 'W');
    return `${Math.abs(coord).toFixed(6)}° ${direction}`;
  };

  const formatAccuracy = (accuracy: number) => {
    if (accuracy < 5) return 'Excellent';
    if (accuracy < 10) return 'Good';
    if (accuracy < 20) return 'Fair';
    return 'Poor';
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy < 5) return '#10B981';
    if (accuracy < 10) return '#3B82F6';
    if (accuracy < 20) return '#F59E0B';
    return '#EF4444';
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Requesting location permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <MapPin size={48} color="#EF4444" />
          <Text style={styles.permissionTitle}>Location Permission Required</Text>
          <Text style={styles.permissionText}>
            This app needs location access to provide GPS coordinates for evidence documentation.
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestLocationPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>GPS Tracker</Text>
        <View style={[styles.statusIndicator, { backgroundColor: isTracking ? '#10B981' : '#6B7280' }]}>
          <Text style={styles.statusText}>{isTracking ? 'TRACKING' : 'STANDBY'}</Text>
        </View>
      </View>

      <View style={styles.locationCard}>
        {currentLocation ? (
          <>
            <View style={styles.coordinatesContainer}>
              <View style={styles.coordinateRow}>
                <Text style={styles.coordinateLabel}>Latitude:</Text>
                <Text style={styles.coordinateValue}>
                  {formatCoordinate(currentLocation.latitude, 'lat')}
                </Text>
              </View>
              <View style={styles.coordinateRow}>
                <Text style={styles.coordinateLabel}>Longitude:</Text>
                <Text style={styles.coordinateValue}>
                  {formatCoordinate(currentLocation.longitude, 'lng')}
                </Text>
              </View>
            </View>

            <View style={styles.accuracyContainer}>
              <Text style={styles.accuracyLabel}>Accuracy:</Text>
              <Text style={[styles.accuracyValue, { color: getAccuracyColor(currentLocation.accuracy) }]}>
                ±{currentLocation.accuracy.toFixed(1)}m ({formatAccuracy(currentLocation.accuracy)})
              </Text>
            </View>

            {currentLocation.address && (
              <View style={styles.addressContainer}>
                <MapPin size={16} color="#94A3B8" />
                <Text style={styles.addressText}>{currentLocation.address}</Text>
              </View>
            )}

            <View style={styles.timestampContainer}>
              <Clock size={16} color="#94A3B8" />
              <Text style={styles.timestampText}>
                {new Date(currentLocation.timestamp).toLocaleString()}
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.noLocationContainer}>
            <Crosshair size={48} color="#6B7280" />
            <Text style={styles.noLocationText}>No location data available</Text>
            <Text style={styles.noLocationSubtext}>Tap "Get Location" to start</Text>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={getCurrentLocation}>
          <Crosshair size={20} color="#FFF" />
          <Text style={styles.controlButtonText}>Get Location</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.controlButton, isTracking && styles.trackingButton]} 
          onPress={toggleTracking}
        >
          <Navigation size={20} color="#FFF" />
          <Text style={styles.controlButtonText}>
            {isTracking ? 'Stop Tracking' : 'Start Tracking'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.controlButton, !currentLocation && styles.disabledButton]} 
          onPress={shareCurrentLocation}
          disabled={!currentLocation}
        >
          <Share2 size={20} color="#FFF" />
          <Text style={styles.controlButtonText}>Share Location</Text>
        </TouchableOpacity>
      </View>

      {locationHistory.length > 0 && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Location History ({locationHistory.length})</Text>
          <View style={styles.historyStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Distance Traveled</Text>
              <Text style={styles.statValue}>
                {calculateTotalDistance(locationHistory).toFixed(0)}m
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Avg Accuracy</Text>
              <Text style={styles.statValue}>
                ±{(locationHistory.reduce((sum, loc) => sum + loc.accuracy, 0) / locationHistory.length).toFixed(1)}m
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const calculateTotalDistance = (locations: GPSCoordinate[]): number => {
  if (locations.length < 2) return 0;

  let totalDistance = 0;
  for (let i = 1; i < locations.length; i++) {
    const prev = locations[i - 1];
    const curr = locations[i];
    
    // Haversine formula for distance calculation
    const R = 6371000; // Earth's radius in meters
    const dLat = (curr.latitude - prev.latitude) * Math.PI / 180;
    const dLon = (curr.longitude - prev.longitude) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(prev.latitude * Math.PI / 180) * Math.cos(curr.latitude * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    totalDistance += distance;
  }
  
  return totalDistance;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 50,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  permissionButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  statusIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  locationCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  coordinatesContainer: {
    marginBottom: 16,
  },
  coordinateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  coordinateLabel: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
  },
  coordinateValue: {
    fontSize: 14,
    color: '#F8FAFC',
    fontFamily: 'monospace',
  },
  accuracyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  accuracyLabel: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
  },
  accuracyValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  addressText: {
    fontSize: 14,
    color: '#94A3B8',
    marginLeft: 8,
    flex: 1,
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestampText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 8,
  },
  noLocationContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noLocationText: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 16,
    marginBottom: 4,
  },
  noLocationSubtext: {
    fontSize: 14,
    color: '#475569',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 8,
  },
  controlButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
  },
  trackingButton: {
    backgroundColor: '#EF4444',
  },
  disabledButton: {
    backgroundColor: '#374151',
    opacity: 0.5,
  },
  controlButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  historyContainer: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 12,
  },
  historyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
});