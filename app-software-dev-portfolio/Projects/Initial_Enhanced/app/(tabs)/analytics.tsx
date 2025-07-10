import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

export default function AnalyticsScreen() {
  const [analyticsData, setAnalyticsData] = useState({
    rfDetections: [5, 8, 12, 7, 15, 9, 11, 6],
    thermalReadings: [3, 6, 9, 4, 8, 5, 7, 3],
    deviceTypes: [
      { name: 'WiFi Routers', count: 15, color: '#3B82F6' },
      { name: 'Mobile Devices', count: 12, color: '#10B981' },
      { name: 'Bluetooth', count: 8, color: '#8B5CF6' },
      { name: 'IoT Devices', count: 6, color: '#F59E0B' },
      { name: 'Unknown', count: 4, color: '#EF4444' }
    ],
    timeLabels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
    threatLevels: { low: 25, medium: 12, high: 3 }
  });

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setAnalyticsData(prev => ({
        ...prev,
        rfDetections: prev.rfDetections.map(val => val + Math.floor(Math.random() * 3) - 1),
        thermalReadings: prev.thermalReadings.map(val => val + Math.floor(Math.random() * 2) - 1),
        threatLevels: {
          low: prev.threatLevels.low + Math.floor(Math.random() * 3) - 1,
          medium: prev.threatLevels.medium + Math.floor(Math.random() * 2) - 1,
          high: prev.threatLevels.high + Math.floor(Math.random() * 2) - 1
        }
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AnalyticsDashboard data={analyticsData} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
});