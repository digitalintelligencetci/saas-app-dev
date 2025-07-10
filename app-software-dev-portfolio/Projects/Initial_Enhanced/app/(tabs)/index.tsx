import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Square, Wifi, Bluetooth, Signal, Smartphone, TriangleAlert as AlertTriangle, Search, Filter, ScanLine } from 'lucide-react-native';

interface RFSignal {
  id: string;
  type: 'wifi' | 'bluetooth' | 'cellular' | 'rfid';
  name: string;
  strength: number;
  frequency: string;
  lastSeen: string;
  location: { x: number; y: number };
  threat: 'low' | 'medium' | 'high';
}

export default function RFScannerScreen() {
  const [isScanning, setIsScanning] = useState(false);
  const [signals, setSignals] = useState<RFSignal[]>([]);
  const [scanDuration, setScanDuration] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'wifi' | 'bluetooth' | 'cellular' | 'rfid'>('all');
  const [scanProfile, setScanProfile] = useState<'standard' | 'deep' | 'stealth'>('standard');

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
            location: { x: Math.random() * 100, y: Math.random() * 100 },
            threat: generateThreatLevel()
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

  const generateThreatLevel = (): 'low' | 'medium' | 'high' => {
    const rand = Math.random();
    if (rand > 0.9) return 'high';
    if (rand > 0.7) return 'medium';
    return 'low';
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

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const filteredSignals = signals.filter(signal => {
    const matchesSearch = signal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         signal.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || signal.type === filterType;
    return matchesSearch && matchesFilter;
  });

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

      <View style={styles.controlsContainer}>
        <View style={styles.searchContainer}>
          <Search size={16} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search signals..."
            placeholderTextColor="#64748B"
          />
        </View>
        
        <View style={styles.filtersContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, filterType === 'all' && styles.activeFilter]}
            onPress={() => setFilterType('all')}
          >
            <Text style={[styles.filterText, filterType === 'all' && styles.activeFilterText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filterType === 'wifi' && styles.activeFilter]}
            onPress={() => setFilterType('wifi')}
          >
            <Wifi size={16} color={filterType === 'wifi' ? '#FFF' : '#94A3B8'} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filterType === 'bluetooth' && styles.activeFilter]}
            onPress={() => setFilterType('bluetooth')}
          >
            <Bluetooth size={16} color={filterType === 'bluetooth' ? '#FFF' : '#94A3B8'} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filterType === 'cellular' && styles.activeFilter]}
            onPress={() => setFilterType('cellular')}
          >
            <Signal size={16} color={filterType === 'cellular' ? '#FFF' : '#94A3B8'} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileContainer}>
          <Text style={styles.profileLabel}>Scan Profile:</Text>
          <View style={styles.profileButtons}>
            {['standard', 'deep', 'stealth'].map((profile) => (
              <TouchableOpacity
                key={profile}
                style={[styles.profileButton, scanProfile === profile && styles.activeProfile]}
                onPress={() => setScanProfile(profile as any)}
              >
                <Text style={[styles.profileText, scanProfile === profile && styles.activeProfileText]}>
                  {profile.charAt(0).toUpperCase() + profile.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
          <Text style={styles.statNumber}>{signals.filter(s => s.threat === 'high').length}</Text>
          <Text style={styles.statLabel}>High Threats</Text>
        </View>
      </View>

      <ScrollView style={styles.signalsList}>
        <Text style={styles.sectionTitle}>
          Detected Signals ({filteredSignals.length})
        </Text>
        {filteredSignals.map((signal) => (
          <View key={signal.id} style={styles.signalItem}>
            <View style={styles.signalHeader}>
              {getSignalIcon(signal.type)}
              <Text style={styles.signalName}>{signal.name}</Text>
              <Text style={[styles.signalStrength, { color: getSignalColor(signal.strength) }]}>
                {signal.strength}%
              </Text>
            </View>
            <View style={styles.threatIndicator}>
              <View style={[styles.threatDot, { backgroundColor: getThreatColor(signal.threat) }]} />
              <Text style={[styles.threatText, { color: getThreatColor(signal.threat) }]}>
                {signal.threat.toUpperCase()} THREAT
              </Text>
            </View>
            <View style={styles.signalDetails}>
              <Text style={styles.signalDetail}>Frequency: {signal.frequency}</Text>
              <Text style={styles.signalDetail}>Last seen: {signal.lastSeen}</Text>
              <Text style={styles.signalDetail}>Type: {signal.type.toUpperCase()}</Text>
            </View>
          </View>
        ))}
        {filteredSignals.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {signals.length === 0 ? 'No signals detected' : 'No signals match filters'}
            </Text>
            <Text style={styles.emptySubtext}>
              {signals.length === 0 ? 'Start scanning to detect RF signals' : 'Try adjusting your search or filters'}
            </Text>
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
  controlsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 14,
    marginLeft: 8,
  },
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#374151',
    borderRadius: 6,
    minWidth: 50,
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: '#3B82F6',
  },
  filterText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FFF',
  },
  profileContainer: {
    marginBottom: 8,
  },
  profileLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 6,
    fontWeight: '600',
  },
  profileButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  profileButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#374151',
    borderRadius: 6,
  },
  activeProfile: {
    backgroundColor: '#10B981',
  },
  profileText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  activeProfileText: {
    color: '#FFF',
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
  threatIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 32,
    marginBottom: 8,
  },
  threatDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  threatText: {
    fontSize: 10,
    fontWeight: '600',
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