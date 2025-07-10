import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Wifi, Thermometer, Shield, MapPin, Bell, Download, Info, CircleHelp as HelpCircle, Users, Database, Zap } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [autoExport, setAutoExport] = useState(false);
  const [locationServices, setLocationServices] = useState(true);
  const [highPrecisionMode, setHighPrecisionMode] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [realTimeSync, setRealTimeSync] = useState(true);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [collaborationMode, setCollaborationMode] = useState(true);

  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message);
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    hasSwitch = false, 
    switchValue = false, 
    onSwitchChange 
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    onPress?: () => void;
    hasSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIcon}>
        {icon}
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      {hasSwitch && (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#374151', true: '#3B82F6' }}
          thumbColor={switchValue ? '#FFF' : '#9CA3AF'}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Configure scanner parameters</Text>
      </View>

      <ScrollView style={styles.settingsList}>
        <Text style={styles.sectionTitle}>Scanning Configuration</Text>
        
        <SettingItem
          icon={<Wifi size={24} color="#3B82F6" />}
          title="RF Scanner Settings"
          subtitle="Configure frequency ranges and sensitivity"
          onPress={() => showAlert('RF Scanner', 'Configure RF scanning parameters including frequency bands, sensitivity thresholds, and detection algorithms.')}
        />

        <SettingItem
          icon={<Thermometer size={24} color="#EF4444" />}
          title="Thermal Camera Settings"
          subtitle="Adjust temperature ranges and calibration"
          onPress={() => showAlert('Thermal Camera', 'Configure thermal imaging parameters including temperature ranges, calibration settings, and heat signature detection.')}
        />

        <SettingItem
          icon={<Shield size={24} color="#10B981" />}
          title="High Precision Mode"
          subtitle="Enhanced accuracy for detailed scanning"
          hasSwitch={true}
          switchValue={highPrecisionMode}
          onSwitchChange={setHighPrecisionMode}
        />

        <Text style={styles.sectionTitle}>Data & Reports</Text>

        <SettingItem
          icon={<Database size={24} color="#3B82F6" />}
          title="Real-time Sync"
          subtitle="Sync data with team members in real-time"
          hasSwitch={true}
          switchValue={realTimeSync}
          onSwitchChange={setRealTimeSync}
        />

        <SettingItem
          icon={<Download size={24} color="#F59E0B" />}
          title="Auto Export Reports"
          subtitle="Automatically generate reports after scanning"
          hasSwitch={true}
          switchValue={autoExport}
          onSwitchChange={setAutoExport}
        />

        <SettingItem
          icon={<MapPin size={24} color="#8B5CF6" />}
          title="Location Services"
          subtitle="GPS coordinates for evidence documentation"
          hasSwitch={true}
          switchValue={locationServices}
          onSwitchChange={setLocationServices}
        />

        <SettingItem
          icon={<Bell size={24} color="#06B6D4" />}
          title="Notifications"
          subtitle="Alerts for device detection and system status"
          hasSwitch={true}
          switchValue={notifications}
          onSwitchChange={setNotifications}
        />

        <SettingItem
          icon={<Users size={24} color="#10B981" />}
          title="Team Collaboration"
          subtitle="Enable real-time team communication and data sharing"
          hasSwitch={true}
          switchValue={collaborationMode}
          onSwitchChange={setCollaborationMode}
        />

        <Text style={styles.sectionTitle}>System</Text>

        <SettingItem
          icon={<Shield size={24} color="#EF4444" />}
          title="End-to-End Encryption"
          subtitle="Encrypt all data and communications"
          hasSwitch={true}
          switchValue={encryptionEnabled}
          onSwitchChange={setEncryptionEnabled}
        />

        <SettingItem
          icon={<Wifi size={24} color="#64748B" />}
          title="Offline Mode"
          subtitle="Function without network connectivity"
          hasSwitch={true}
          switchValue={offlineMode}
          onSwitchChange={setOfflineMode}
        />

        <SettingItem
          icon={<Download size={24} color="#64748B" />}
          title="Data Storage"
          subtitle="Manage local storage and cloud backup"
          onPress={() => showAlert('Data Storage', 'Configure local storage limits, cloud backup settings, and data retention policies.')}
        />

        <SettingItem
          icon={<Shield size={24} color="#64748B" />}
          title="Security Settings"
          subtitle="Encryption and access control"
          onPress={() => showAlert('Security', 'Configure encryption settings, access controls, and security protocols for evidence integrity.')}
        />

        <SettingItem
          icon={<Zap size={24} color="#F59E0B" />}
          title="Performance Mode"
          subtitle="Optimize for battery life or maximum performance"
          onPress={() => showAlert('Performance Mode', 'Choose between Battery Saver, Balanced, or High Performance modes for optimal operation.')}
        />

        <Text style={styles.sectionTitle}>Device Integration</Text>

        <SettingItem
          icon={<Settings size={24} color="#64748B" />}
          title="External RF Scanner"
          subtitle="Connect and configure external RF hardware"
          onPress={() => showAlert('External RF Scanner', 'Configure connection to external RF scanning hardware via USB, Bluetooth, or Wi-Fi.')}
        />

        <SettingItem
          icon={<Thermometer size={24} color="#64748B" />}
          title="External Thermal Camera"
          subtitle="Connect and configure thermal imaging hardware"
          onPress={() => showAlert('External Thermal Camera', 'Configure connection to external thermal imaging hardware and calibration settings.')}
        />

        <Text style={styles.sectionTitle}>Support</Text>

        <SettingItem
          icon={<HelpCircle size={24} color="#64748B" />}
          title="Help & Documentation"
          subtitle="User guides and troubleshooting"
          onPress={() => showAlert('Help', 'Access user documentation, troubleshooting guides, and best practices for field operations.')}
        />

        <SettingItem
          icon={<Info size={24} color="#64748B" />}
          title="About"
          subtitle="Version info, diagnostics, and legal information"
          onPress={() => showAlert('About', `RF-Thermal Scanner v2.0.0\nBuild: 2025.01.20\nPlatform: ${Platform.OS}\nLicense: Emergency Services\n\nFeatures:\n• Advanced Analytics\n• Team Collaboration\n• Evidence Chain of Custody\n• GPS Integration\n• Real-time Sync\n\nSystem Status: Operational`)}
        />

        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>RF-Thermal Scanner v2.0.0</Text>
          <Text style={styles.versionSubtext}>Professional Emergency Services Edition</Text>
          <Text style={styles.versionSubtext}>© 2025 Emergency Technology Systems</Text>
          <Text style={styles.versionSubtext}>Enhanced with AI-powered analytics</Text>
        </View>
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
  settingsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 12,
    marginTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  settingIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
  },
  versionInfo: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  versionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 2,
  },
});