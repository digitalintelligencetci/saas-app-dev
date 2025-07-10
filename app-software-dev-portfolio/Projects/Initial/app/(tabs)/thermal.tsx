import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Square, Thermometer, Eye, Camera, TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface ThermalReading {
  id: string;
  temperature: number;
  location: { x: number; y: number };
  timestamp: string;
  deviceType: string;
  confidence: number;
}

const { width } = Dimensions.get('window');

export default function ThermalScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [readings, setReadings] = useState<ThermalReading[]>([]);
  const [scanDuration, setScanDuration] = useState(0);
  const [ambientTemp, setAmbientTemp] = useState(22.5);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning) {
      interval = setInterval(() => {
        setScanDuration(prev => prev + 1);
        // Simulate new thermal reading
        if (Math.random() > 0.6) {
          const newReading: ThermalReading = {
            id: Date.now().toString(),
            temperature: Math.random() * 50 + 20,
            location: { x: Math.random() * 100, y: Math.random() * 100 },
            timestamp: new Date().toLocaleTimeString(),
            deviceType: getRandomDeviceType(),
            confidence: Math.random() * 30 + 70
          };
          setReadings(prev => [...prev, newReading].slice(-8));
        }
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  const getRandomDeviceType = () => {
    const types = ['Mobile Device', 'Laptop', 'Router', 'IoT Device', 'Unknown Device'];
    return types[Math.floor(Math.random() * types.length)];
  };

  const toggleScanning = () => {
    if (isScanning) {
      setIsScanning(false);
      setScanDuration(0);
    } else {
      setReadings([]);
      setIsScanning(true);
    }
  };

  const getTempColor = (temp: number) => {
    if (temp > 40) return '#EF4444';
    if (temp > 30) return '#F59E0B';
    if (temp > 25) return '#10B981';
    return '#3B82F6';
  };

  const renderThermalGrid = () => {
    const gridSize = 12;
    const cells = [];
    
    for (let i = 0; i < gridSize * gridSize; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      const baseTemp = ambientTemp + (Math.random() - 0.5) * 5;
      
      // Add hot spots for detected readings
      let cellTemp = baseTemp;
      readings.forEach(reading => {
        const readingRow = Math.floor(reading.location.y / (100 / gridSize));
        const readingCol = Math.floor(reading.location.x / (100 / gridSize));
        if (Math.abs(row - readingRow) <= 1 && Math.abs(col - readingCol) <= 1) {
          cellTemp = Math.max(cellTemp, reading.temperature);
        }
      });

      cells.push(
        <View
          key={i}
          style={[
            styles.thermalCell,
            { backgroundColor: getTempColor(cellTemp) }
          ]}
        />
      );
    }
    
    return cells;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Thermal Imaging Scanner</Text>
        <Text style={styles.subtitle}>Heat Signature Detection</Text>
      </View>

      <View style={styles.scanControls}>
        <TouchableOpacity
          style={[styles.scanButton, isScanning && styles.scanButtonActive]}
          onPress={toggleScanning}
        >
          {isScanning ? <Square size={32} color="#FFF" /> : <Play size={32} color="#FFF" />}
        </TouchableOpacity>
        <View style={styles.scanInfo}>
          <Text style={styles.scanStatus}>
            {isScanning ? 'Scanning Thermal...' : 'Ready to Scan'}
          </Text>
          <Text style={styles.scanTime}>
            Duration: {Math.floor(scanDuration / 60)}:{(scanDuration % 60).toString().padStart(2, '0')}
          </Text>
        </View>
      </View>

      <View style={styles.thermalContainer}>
        <Text style={styles.sectionTitle}>Thermal View</Text>
        <View style={styles.thermalGrid}>
          {renderThermalGrid()}
        </View>
        <View style={styles.temperatureScale}>
          <View style={styles.scaleItem}>
            <View style={[styles.colorBox, { backgroundColor: '#3B82F6' }]} />
            <Text style={styles.scaleText}>Cold (20-25°C)</Text>
          </View>
          <View style={styles.scaleItem}>
            <View style={[styles.colorBox, { backgroundColor: '#10B981' }]} />
            <Text style={styles.scaleText}>Normal (25-30°C)</Text>
          </View>
          <View style={styles.scaleItem}>
            <View style={[styles.colorBox, { backgroundColor: '#F59E0B' }]} />
            <Text style={styles.scaleText}>Warm (30-40°C)</Text>
          </View>
          <View style={styles.scaleItem}>
            <View style={[styles.colorBox, { backgroundColor: '#EF4444' }]} />
            <Text style={styles.scaleText}>Hot (40°C+)</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{readings.length}</Text>
          <Text style={styles.statLabel}>Heat Sources</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{ambientTemp.toFixed(1)}°C</Text>
          <Text style={styles.statLabel}>Ambient Temp</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {readings.length > 0 ? Math.max(...readings.map(r => r.temperature)).toFixed(1) : '0'}°C
          </Text>
          <Text style={styles.statLabel}>Max Temp</Text>
        </View>
      </View>

      <ScrollView style={styles.readingsList}>
        <Text style={styles.sectionTitle}>Thermal Readings</Text>
        {readings.map((reading) => (
          <View key={reading.id} style={styles.readingItem}>
            <View style={styles.readingHeader}>
              <Thermometer size={20} color={getTempColor(reading.temperature)} />
              <Text style={styles.readingTemp}>
                {reading.temperature.toFixed(1)}°C
              </Text>
              <Text style={styles.readingConfidence}>
                {reading.confidence.toFixed(0)}% confidence
              </Text>
            </View>
            <View style={styles.readingDetails}>
              <Text style={styles.readingDetail}>Device: {reading.deviceType}</Text>
              <Text style={styles.readingDetail}>Time: {reading.timestamp}</Text>
              <Text style={styles.readingDetail}>
                Location: ({reading.location.x.toFixed(1)}, {reading.location.y.toFixed(1)})
              </Text>
            </View>
          </View>
        ))}
        {readings.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No thermal readings</Text>
            <Text style={styles.emptySubtext}>Start scanning to detect heat signatures</Text>
          </View>
        )}
      </ScrollView>
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
  },
  scanControls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  scanButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  scanButtonActive: {
    backgroundColor: '#7C2D12',
    shadowColor: '#7C2D12',
  },
  scanInfo: {
    flex: 1,
  },
  scanStatus: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  scanTime: {
    fontSize: 14,
    color: '#94A3B8',
  },
  thermalContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 12,
  },
  thermalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 8,
    marginBottom: 12,
  },
  thermalCell: {
    width: (width - 56) / 12,
    height: (width - 56) / 12,
    margin: 1,
    borderRadius: 2,
  },
  temperatureScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  scaleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  colorBox: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 6,
  },
  scaleText: {
    fontSize: 10,
    color: '#94A3B8',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EF4444',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  readingsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  readingItem: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  readingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  readingTemp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginLeft: 12,
    flex: 1,
  },
  readingConfidence: {
    fontSize: 12,
    color: '#94A3B8',
  },
  readingDetails: {
    marginLeft: 32,
  },
  readingDetail: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 2,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#64748B',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
  },
});