import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  MapPin, 
  Battery, 
  Signal, 
  AlertTriangle, 
  Phone, 
  Settings, 
  Heart, 
  Shield,
  Navigation,
  Wifi,
  Bluetooth,
  Sun,
  Droplets,
  Thermometer
} from 'lucide-react-native';

interface WristbandDevice {
  id: string;
  name: string;
  batteryLevel: number;
  signalStrength: number;
  isConnected: boolean;
  lastSeen: string;
  location: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  status: 'safe' | 'warning' | 'emergency' | 'offline';
  userInfo: {
    name: string;
    age: number;
    bloodType: string;
    emergencyContacts: Array<{
      name: string;
      phone: string;
      relationship: string;
    }>;
  };
  environmentalData: {
    waterDepth?: number;
    temperature: number;
    pressure: number;
    uvIndex: number;
  };
}

const { width } = Dimensions.get('window');

export default function WristbandScreen() {
  const [devices, setDevices] = useState<WristbandDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<WristbandDevice | null>(null);
  const [emergencyMode, setEmergencyMode] = useState(false);

  useEffect(() => {
    // Simulate wristband devices
    const sampleDevices: WristbandDevice[] = [
      {
        id: 'wristband_001',
        name: 'John\'s Safety Band',
        batteryLevel: 85,
        signalStrength: 92,
        isConnected: true,
        lastSeen: '2 minutes ago',
        location: {
          latitude: 21.6940,
          longitude: -71.7979,
          accuracy: 3
        },
        status: 'safe',
        userInfo: {
          name: 'John Smith',
          age: 35,
          bloodType: 'O+',
          emergencyContacts: [
            { name: 'Sarah Smith', phone: '+1-649-946-1234', relationship: 'Spouse' },
            { name: 'Dr. Johnson', phone: '+1-649-946-5678', relationship: 'Emergency Contact' }
          ]
        },
        environmentalData: {
          waterDepth: 0,
          temperature: 28.5,
          pressure: 1013.25,
          uvIndex: 8
        }
      },
      {
        id: 'wristband_002',
        name: 'Grace Bay Resort Band',
        batteryLevel: 45,
        signalStrength: 78,
        isConnected: true,
        lastSeen: '5 minutes ago',
        location: {
          latitude: 21.7850,
          longitude: -72.2460,
          accuracy: 5
        },
        status: 'warning',
        userInfo: {
          name: 'Maria Rodriguez',
          age: 28,
          bloodType: 'A+',
          emergencyContacts: [
            { name: 'Carlos Rodriguez', phone: '+1-649-946-2345', relationship: 'Husband' },
            { name: 'Resort Security', phone: '+1-649-946-9999', relationship: 'Resort Contact' }
          ]
        },
        environmentalData: {
          waterDepth: 2.5,
          temperature: 26.8,
          pressure: 1012.50,
          uvIndex: 6
        }
      }
    ];
    setDevices(sampleDevices);
    setSelectedDevice(sampleDevices[0]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'emergency': return '#EF4444';
      case 'offline': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <Shield size={20} color="#10B981" />;
      case 'warning': return <AlertTriangle size={20} color="#F59E0B" />;
      case 'emergency': return <AlertTriangle size={20} color="#EF4444" />;
      case 'offline': return <Wifi size={20} color="#6B7280" />;
      default: return <Wifi size={20} color="#6B7280" />;
    }
  };

  const handleEmergencyCall = () => {
    Alert.alert(
      'Emergency Call',
      'Call 911 Emergency Services?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call 911', style: 'destructive', onPress: () => {
          // In real app, this would initiate emergency call
          console.log('Calling 911...');
        }}
      ]
    );
  };

  const handleSOSAlert = () => {
    setEmergencyMode(true);
    Alert.alert(
      'SOS Alert Sent',
      'Emergency services have been notified. Help is on the way.',
      [{ text: 'OK', onPress: () => setEmergencyMode(false) }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Safety Wristband</Text>
        <Text style={styles.subtitle}>TCI Emergency Response System</Text>
      </View>

      {/* Emergency Controls */}
      <View style={styles.emergencyContainer}>
        <TouchableOpacity
          style={[styles.emergencyButton, emergencyMode && styles.emergencyButtonActive]}
          onPress={handleSOSAlert}
        >
          <AlertTriangle size={24} color="#FFF" />
          <Text style={styles.emergencyButtonText}>SOS ALERT</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.emergencyCallButton}
          onPress={handleEmergencyCall}
        >
          <Phone size={20} color="#FFF" />
          <Text style={styles.emergencyCallText}>911</Text>
        </TouchableOpacity>
      </View>

      {/* Device Status Overview */}
      <View style={styles.statusContainer}>
        <Text style={styles.sectionTitle}>Connected Devices ({devices.length})</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {devices.map((device) => (
            <TouchableOpacity
              key={device.id}
              style={[
                styles.deviceCard,
                selectedDevice?.id === device.id && styles.deviceCardSelected
              ]}
              onPress={() => setSelectedDevice(device)}
            >
              <View style={styles.deviceHeader}>
                {getStatusIcon(device.status)}
                <Text style={styles.deviceName}>{device.name}</Text>
              </View>
              
              <View style={styles.deviceStats}>
                <View style={styles.statItem}>
                  <Battery size={16} color="#94A3B8" />
                  <Text style={styles.statText}>{device.batteryLevel}%</Text>
                </View>
                <View style={styles.statItem}>
                  <Signal size={16} color="#94A3B8" />
                  <Text style={styles.statText}>{device.signalStrength}%</Text>
                </View>
              </View>
              
              <Text style={styles.lastSeen}>Last seen: {device.lastSeen}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Selected Device Details */}
      {selectedDevice && (
        <ScrollView style={styles.deviceDetails}>
          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>Device Information</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status:</Text>
              <View style={styles.statusIndicator}>
                {getStatusIcon(selectedDevice.status)}
                <Text style={[styles.statusText, { color: getStatusColor(selectedDevice.status) }]}>
                  {selectedDevice.status.toUpperCase()}
                </Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Battery:</Text>
              <View style={styles.batteryIndicator}>
                <Battery size={16} color="#94A3B8" />
                <Text style={styles.infoValue}>{selectedDevice.batteryLevel}%</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Signal:</Text>
              <View style={styles.signalIndicator}>
                <Signal size={16} color="#94A3B8" />
                <Text style={styles.infoValue}>{selectedDevice.signalStrength}%</Text>
              </View>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Location:</Text>
              <Text style={styles.infoValue}>
                {selectedDevice.location.latitude.toFixed(4)}, {selectedDevice.location.longitude.toFixed(4)}
              </Text>
            </View>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>User Information</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>{selectedDevice.userInfo.name}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Age:</Text>
              <Text style={styles.infoValue}>{selectedDevice.userInfo.age} years</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Blood Type:</Text>
              <Text style={styles.infoValue}>{selectedDevice.userInfo.bloodType}</Text>
            </View>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>Environmental Data</Text>
            
            <View style={styles.environmentalGrid}>
              <View style={styles.envItem}>
                <Thermometer size={20} color="#3B82F6" />
                <Text style={styles.envLabel}>Temperature</Text>
                <Text style={styles.envValue}>{selectedDevice.environmentalData.temperature}°C</Text>
              </View>
              
              <View style={styles.envItem}>
                <Droplets size={20} color="#3B82F6" />
                <Text style={styles.envLabel}>Water Depth</Text>
                <Text style={styles.envValue}>
                  {selectedDevice.environmentalData.waterDepth || 0}m
                </Text>
              </View>
              
              <View style={styles.envItem}>
                <Sun size={20} color="#F59E0B" />
                <Text style={styles.envLabel}>UV Index</Text>
                <Text style={styles.envValue}>{selectedDevice.environmentalData.uvIndex}</Text>
              </View>
              
              <View style={styles.envItem}>
                <Navigation size={20} color="#10B981" />
                <Text style={styles.envLabel}>Pressure</Text>
                <Text style={styles.envValue}>{selectedDevice.environmentalData.pressure}hPa</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>Emergency Contacts</Text>
            {selectedDevice.userInfo.emergencyContacts.map((contact, index) => (
              <TouchableOpacity key={index} style={styles.contactItem}>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactRelationship}>{contact.relationship}</Text>
                  <Text style={styles.contactPhone}>{contact.phone}</Text>
                </View>
                <TouchableOpacity style={styles.callButton}>
                  <Phone size={16} color="#3B82F6" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
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
  emergencyContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  emergencyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  emergencyButtonActive: {
    backgroundColor: '#DC2626',
  },
  emergencyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emergencyCallButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
  },
  emergencyCallText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 12,
  },
  deviceCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 200,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  deviceCardSelected: {
    borderColor: '#3B82F6',
  },
  deviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  deviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F8FAFC',
    flex: 1,
  },
  deviceStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  lastSeen: {
    fontSize: 10,
    color: '#64748B',
  },
  deviceDetails: {
    flex: 1,
    paddingHorizontal: 20,
  },
  detailCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#94A3B8',
  },
  infoValue: {
    fontSize: 14,
    color: '#F8FAFC',
    fontWeight: '500',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  batteryIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  signalIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  environmentalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  envItem: {
    alignItems: 'center',
    minWidth: 80,
  },
  envLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
    textAlign: 'center',
  },
  envValue: {
    fontSize: 14,
    color: '#F8FAFC',
    fontWeight: '600',
    marginTop: 2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F8FAFC',
  },
  contactRelationship: {
    fontSize: 12,
    color: '#94A3B8',
  },
  contactPhone: {
    fontSize: 12,
    color: '#3B82F6',
  },
  callButton: {
    padding: 8,
    backgroundColor: '#1E40AF20',
    borderRadius: 8,
  },
}); 