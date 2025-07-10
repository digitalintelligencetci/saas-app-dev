import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Square, Wifi, Bluetooth, Signal, Smartphone, TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface RFSignal {
  id: string;
  type: 'wifi' | 'bluetooth' | 'cellular' | 'rfid';
  name: string;
  strength: number;
  frequency: string;
  lastSeen: string;
  location: { x: number; y: number };
}

export default function RFScannerScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [signals, setSignals] = useState<RFSignal[]>([]);
  const [scanDuration, setScanDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning) {
      interval = setInterval(() => {
        setScanDuration(prev => prev + 1);
        // Simulate new signal detection
        if (Math.random() > 0.7) {
          const newSignal: RFSignal = {
            id: Date.now().toString(),
            type: ['wifi', 'bluetooth', 'cellular', 'rfid'][Math.floor(Math.random() * 4)] as any,
            name: generateSignalName(),
            strength: Math.floor(Math.random() * 100),
            frequency: generateFrequency(),
            lastSeen: new Date().toLocaleTimeString(),
            location: { x: Math.random() * 100, y: Math.random() * 100 }
          };
          setSignals(prev => [...prev, newSignal].slice(-10));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  const generateSignalName = () => {
    const names = ['Device-A1B2', 'Unknown-WiFi', 'iPhone-12', 'Android-Dev', 'RFID-Card', 'BT-Speaker'];
    return names[Math.floor(Math.random() * names.length)];
  };

  const generateFrequency = () => {
    const frequencies = ['2.4GHz', '5GHz', '900MHz', '1800MHz', '13.56MHz', '125kHz'];
    return frequencies[Math.floor(Math.random() * frequencies.length)];
  };

  const toggleScanning = () => {
    if (isScanning) {
      setIsScanning(false);
      setScanDuration(0);
    } else {
      setSignals([]);
      setIsScanning(true);
    }
  };

  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'wifi': return <Wifi size={20} color="#3B82F6" />;
      case 'bluetooth': return <Bluetooth size={20} color="#8B5CF6" />;
      case 'cellular': return <Signal size={20} color="#10B981" />;
      case 'rfid': return <Smartphone size={20} color="#F59E0B" />;
      default: return <AlertTriangle size={20} color="#EF4444" />;
    }
  };

  const getSignalColor = (strength: number) => {
    if (strength > 70) return '#10B981';
    if (strength > 40) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>RF Signal Scanner</Text>
        <Text style={styles.subtitle}>Detecting Wi-Fi, Bluetooth, Cellular & RFID</Text>
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
            {isScanning ? 'Scanning...' : 'Ready to Scan'}
          </Text>
          <Text style={styles.scanTime}>
            Duration: {Math.floor(scanDuration / 60)}:{(scanDuration % 60).toString().padStart(2, '0')}
          </Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{signals.length}</Text>
          <Text style={styles.statLabel}>Signals Detected</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{signals.filter(s => s.strength > 70).length}</Text>
          <Text style={styles.statLabel}>Strong Signals</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{new Set(signals.map(s => s.type)).size}</Text>
          <Text style={styles.statLabel}>Signal Types</Text>
        </View>
      </View>

      <ScrollView style={styles.signalsList}>
        <Text style={styles.sectionTitle}>Detected Signals</Text>
        {signals.map((signal) => (
          <View key={signal.id} style={styles.signalItem}>
            <View style={styles.signalHeader}>
              {getSignalIcon(signal.type)}
              <Text style={styles.signalName}>{signal.name}</Text>
              <Text style={[styles.signalStrength, { color: getSignalColor(signal.strength) }]}>
                {signal.strength}%
              </Text>
            </View>
            <View style={styles.signalDetails}>
              <Text style={styles.signalDetail}>Frequency: {signal.frequency}</Text>
              <Text style={styles.signalDetail}>Last seen: {signal.lastSeen}</Text>
              <Text style={styles.signalDetail}>Type: {signal.type.toUpperCase()}</Text>
            </View>
          </View>
        ))}
        {signals.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No signals detected</Text>
            <Text style={styles.emptySubtext}>Start scanning to detect RF signals</Text>
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
    backgroundColor: '#1E40AF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  scanButtonActive: {
    backgroundColor: '#EF4444',
    shadowColor: '#EF4444',
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
    color: '#3B82F6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  signalsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 12,
  },
  signalItem: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  signalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  signalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    marginLeft: 12,
    flex: 1,
  },
  signalStrength: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  signalDetails: {
    marginLeft: 32,
  },
  signalDetail: {
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