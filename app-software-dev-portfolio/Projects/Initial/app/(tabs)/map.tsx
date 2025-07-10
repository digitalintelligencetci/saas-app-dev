import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Layers, Zap, Thermometer, Eye, RotateCcw } from 'lucide-react-native';

interface DeviceLocation {
  id: string;
  type: 'rf' | 'thermal';
  name: string;
  position: { x: number; y: number };
  strength: number;
  temperature?: number;
  timestamp: string;
}

const { width } = Dimensions.get('window');
const mapSize = width - 40;

export default function DeviceMapScreen() {
  const [viewMode, setViewMode] = useState<'rf' | 'thermal' | 'combined'>('combined');
  const [devices, setDevices] = useState<DeviceLocation[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<DeviceLocation | null>(null);

  useEffect(() => {
    // Generate sample device locations
    const sampleDevices: DeviceLocation[] = [
      {
        id: '1',
        type: 'rf',
        name: 'WiFi Router',
        position: { x: 20, y: 30 },
        strength: 85,
        timestamp: '10:15:32'
      },
      {
        id: '2',
        type: 'thermal',
        name: 'Laptop',
        position: { x: 60, y: 45 },
        strength: 70,
        temperature: 42.5,
        timestamp: '10:16:15'
      },
      {
        id: '3',
        type: 'rf',
        name: 'Smartphone',
        position: { x: 35, y: 70 },
        strength: 55,
        timestamp: '10:17:08'
      },
      {
        id: '4',
        type: 'thermal',
        name: 'Server',
        position: { x: 80, y: 25 },
        strength: 90,
        temperature: 38.2,
        timestamp: '10:18:42'
      },
      {
        id: '5',
        type: 'rf',
        name: 'Bluetooth Speaker',
        position: { x: 15, y: 85 },
        strength: 40,
        timestamp: '10:19:21'
      }
    ];
    setDevices(sampleDevices);
  }, []);

  const getDeviceColor = (device: DeviceLocation) => {
    if (device.type === 'rf') {
      return device.strength > 70 ? '#3B82F6' : device.strength > 40 ? '#10B981' : '#F59E0B';
    } else {
      return device.temperature! > 40 ? '#EF4444' : device.temperature! > 30 ? '#F59E0B' : '#10B981';
    }
  };

  const shouldShowDevice = (device: DeviceLocation) => {
    if (viewMode === 'combined') return true;
    return device.type === viewMode;
  };

  const renderHeatmap = () => {
    const gridSize = 20;
    const cells = [];
    
    for (let i = 0; i < gridSize * gridSize; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      const x = (col / gridSize) * 100;
      const y = (row / gridSize) * 100;
      
      let intensity = 0;
      devices.forEach(device => {
        const distance = Math.sqrt(
          Math.pow(device.position.x - x, 2) + Math.pow(device.position.y - y, 2)
        );
        const influence = Math.max(0, (device.strength / 100) * (1 - distance / 50));
        intensity += influence;
      });

      const alpha = Math.min(intensity, 0.8);
      cells.push(
        <View
          key={i}
          style={[
            styles.heatmapCell,
            { 
              backgroundColor: `rgba(59, 130, 246, ${alpha})`,
              width: mapSize / gridSize,
              height: mapSize / gridSize,
            }
          ]}
        />
      );
    }
    
    return cells;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Device Location Map</Text>
        <Text style={styles.subtitle}>RF & Thermal Signal Mapping</Text>
      </View>

      <View style={styles.viewModeContainer}>
        <TouchableOpacity
          style={[styles.viewModeButton, viewMode === 'rf' && styles.viewModeButtonActive]}
          onPress={() => setViewMode('rf')}
        >
          <Zap size={20} color={viewMode === 'rf' ? '#FFF' : '#94A3B8'} />
          <Text style={[styles.viewModeText, viewMode === 'rf' && styles.viewModeTextActive]}>RF Only</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewModeButton, viewMode === 'thermal' && styles.viewModeButtonActive]}
          onPress={() => setViewMode('thermal')}
        >
          <Thermometer size={20} color={viewMode === 'thermal' ? '#FFF' : '#94A3B8'} />
          <Text style={[styles.viewModeText, viewMode === 'thermal' && styles.viewModeTextActive]}>Thermal Only</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewModeButton, viewMode === 'combined' && styles.viewModeButtonActive]}
          onPress={() => setViewMode('combined')}
        >
          <Layers size={20} color={viewMode === 'combined' ? '#FFF' : '#94A3B8'} />
          <Text style={[styles.viewModeText, viewMode === 'combined' && styles.viewModeTextActive]}>Combined</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.map}>
          {/* Heatmap background */}
          <View style={styles.heatmapContainer}>
            {renderHeatmap()}
          </View>
          
          {/* Device markers */}
          {devices.filter(shouldShowDevice).map((device) => (
            <TouchableOpacity
              key={device.id}
              style={[
                styles.deviceMarker,
                {
                  left: (device.position.x / 100) * mapSize - 12,
                  top: (device.position.y / 100) * mapSize - 12,
                  backgroundColor: getDeviceColor(device),
                }
              ]}
              onPress={() => setSelectedDevice(device)}
            >
              {device.type === 'rf' ? (
                <Zap size={16} color="#FFF" />
              ) : (
                <Thermometer size={16} color="#FFF" />
              )}
            </TouchableOpacity>
          ))}
          
          {/* Grid lines */}
          {Array.from({ length: 11 }).map((_, i) => (
            <View key={`v-${i}`} style={[styles.gridLine, { left: (i / 10) * mapSize, height: mapSize }]} />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <View key={`h-${i}`} style={[styles.gridLine, { top: (i / 10) * mapSize, width: mapSize }]} />
          ))}
        </View>

        <View style={styles.mapLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#3B82F6' }]} />
            <Text style={styles.legendText}>RF Signal</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#EF4444' }]} />
            <Text style={styles.legendText}>Thermal</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#10B981' }]} />
            <Text style={styles.legendText}>Normal</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#F59E0B' }]} />
            <Text style={styles.legendText}>Warning</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.devicesList}>
        <Text style={styles.sectionTitle}>Detected Devices ({devices.filter(shouldShowDevice).length})</Text>
        {devices.filter(shouldShowDevice).map((device) => (
          <TouchableOpacity
            key={device.id}
            style={[
              styles.deviceItem,
              selectedDevice?.id === device.id && styles.deviceItemSelected
            ]}
            onPress={() => setSelectedDevice(device)}
          >
            <View style={styles.deviceHeader}>
              <View style={[styles.deviceIcon, { backgroundColor: getDeviceColor(device) }]}>
                {device.type === 'rf' ? (
                  <Zap size={16} color="#FFF" />
                ) : (
                  <Thermometer size={16} color="#FFF" />
                )}
              </View>
              <Text style={styles.deviceName}>{device.name}</Text>
              <Text style={styles.deviceType}>{device.type.toUpperCase()}</Text>
            </View>
            <View style={styles.deviceDetails}>
              <Text style={styles.deviceDetail}>
                Position: ({device.position.x.toFixed(1)}, {device.position.y.toFixed(1)})
              </Text>
              <Text style={styles.deviceDetail}>
                Strength: {device.strength}%
              </Text>
              {device.temperature && (
                <Text style={styles.deviceDetail}>
                  Temperature: {device.temperature.toFixed(1)}°C
                </Text>
              )}
              <Text style={styles.deviceDetail}>
                Detected: {device.timestamp}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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
  viewModeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  viewModeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  viewModeButtonActive: {
    backgroundColor: '#3B82F6',
  },
  viewModeText: {
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 8,
    fontWeight: '600',
  },
  viewModeTextActive: {
    color: '#FFF',
  },
  mapContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  map: {
    width: mapSize,
    height: mapSize,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  heatmapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  heatmapCell: {
    opacity: 0.3,
  },
  deviceMarker: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: '#374151',
    width: 1,
    height: 1,
    opacity: 0.3,
  },
  mapLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 10,
    color: '#94A3B8',
  },
  devicesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 12,
  },
  deviceItem: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#374151',
  },
  deviceItemSelected: {
    borderLeftColor: '#3B82F6',
    backgroundColor: '#1E40AF20',
  },
  deviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  deviceIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    flex: 1,
  },
  deviceType: {
    fontSize: 12,
    color: '#94A3B8',
    backgroundColor: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  deviceDetails: {
    marginLeft: 44,
  },
  deviceDetail: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 2,
  },
});