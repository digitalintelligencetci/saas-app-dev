import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EvidenceTracker from '@/components/EvidenceTracker';

export default function EvidenceScreen() {
  const [evidenceItems, setEvidenceItems] = useState([
    {
      id: '1',
      type: 'scan' as const,
      title: 'RF Scan - Building A Floor 3',
      timestamp: '2025-01-20 10:15:32',
      location: {
        lat: 40.7128,
        lng: -74.0060,
        address: '123 Main St, New York, NY'
      },
      officer: 'Officer Johnson',
      hash: 'sha256:a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
      status: 'verified' as const,
      chainOfCustody: [
        {
          id: '1',
          action: 'created' as const,
          officer: 'Officer Johnson',
          timestamp: '2025-01-20 10:15:32',
          location: '123 Main St, New York, NY',
          notes: 'Initial RF scan completed'
        },
        {
          id: '2',
          action: 'verified' as const,
          officer: 'Detective Smith',
          timestamp: '2025-01-20 10:45:15',
          location: 'Evidence Processing Unit',
          notes: 'Hash verification completed'
        }
      ]
    },
    {
      id: '2',
      type: 'thermal' as const,
      title: 'Thermal Imaging - Server Room',
      timestamp: '2025-01-20 11:30:45',
      location: {
        lat: 40.7589,
        lng: -73.9851,
        address: '456 Tech Ave, New York, NY'
      },
      officer: 'Officer Davis',
      hash: 'sha256:b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567',
      status: 'sealed' as const,
      chainOfCustody: [
        {
          id: '3',
          action: 'created' as const,
          officer: 'Officer Davis',
          timestamp: '2025-01-20 11:30:45',
          location: '456 Tech Ave, New York, NY',
          notes: 'Thermal scan of server room'
        },
        {
          id: '4',
          action: 'verified' as const,
          officer: 'Detective Smith',
          timestamp: '2025-01-20 12:00:12',
          location: 'Evidence Processing Unit',
          notes: 'Integrity verified'
        },
        {
          id: '5',
          action: 'sealed' as const,
          officer: 'Sergeant Wilson',
          timestamp: '2025-01-20 12:15:30',
          location: 'Evidence Processing Unit',
          notes: 'Evidence sealed for court proceedings'
        }
      ]
    },
    {
      id: '3',
      type: 'report' as const,
      title: 'Combined Analysis Report',
      timestamp: '2025-01-20 14:20:18',
      location: {
        lat: 40.7505,
        lng: -73.9934,
        address: 'Police Headquarters, New York, NY'
      },
      officer: 'Detective Smith',
      hash: 'sha256:c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678',
      status: 'pending' as const,
      chainOfCustody: [
        {
          id: '6',
          action: 'created' as const,
          officer: 'Detective Smith',
          timestamp: '2025-01-20 14:20:18',
          location: 'Police Headquarters, New York, NY',
          notes: 'Comprehensive analysis report generated'
        }
      ]
    }
  ]);

  const handleSealEvidence = (id: string) => {
    setEvidenceItems(prev => prev.map(item => {
      if (item.id === id) {
        const newChainEvent = {
          id: Date.now().toString(),
          action: 'sealed' as const,
          officer: 'Current User',
          timestamp: new Date().toISOString(),
          location: 'Evidence Processing Unit',
          notes: 'Evidence sealed for legal proceedings'
        };
        
        return {
          ...item,
          status: 'sealed' as const,
          chainOfCustody: [...item.chainOfCustody, newChainEvent]
        };
      }
      return item;
    }));
    
    Alert.alert('Evidence Sealed', 'Evidence has been successfully sealed and is now tamper-proof');
  };

  const handleTransferEvidence = (id: string, recipient: string) => {
    setEvidenceItems(prev => prev.map(item => {
      if (item.id === id) {
        const newChainEvent = {
          id: Date.now().toString(),
          action: 'transferred' as const,
          officer: 'Current User',
          timestamp: new Date().toISOString(),
          location: 'Evidence Transfer Station',
          notes: `Transferred to ${recipient}`
        };
        
        return {
          ...item,
          status: 'transferred' as const,
          chainOfCustody: [...item.chainOfCustody, newChainEvent]
        };
      }
      return item;
    }));
    
    Alert.alert('Evidence Transferred', `Evidence has been transferred to ${recipient}`);
  };

  const handleVerifyIntegrity = (id: string) => {
    // Simulate hash verification
    setTimeout(() => {
      setEvidenceItems(prev => prev.map(item => {
        if (item.id === id && item.status === 'pending') {
          const newChainEvent = {
            id: Date.now().toString(),
            action: 'verified' as const,
            officer: 'Current User',
            timestamp: new Date().toISOString(),
            location: 'Evidence Processing Unit',
            notes: 'Hash integrity verification completed'
          };
          
          return {
            ...item,
            status: 'verified' as const,
            chainOfCustody: [...item.chainOfCustody, newChainEvent]
          };
        }
        return item;
      }));
      
      Alert.alert('Integrity Verified', 'Evidence integrity has been verified successfully');
    }, 2000);
    
    Alert.alert('Verifying...', 'Checking evidence integrity...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <EvidenceTracker
        evidenceItems={evidenceItems}
        onSealEvidence={handleSealEvidence}
        onTransferEvidence={handleTransferEvidence}
        onVerifyIntegrity={handleVerifyIntegrity}
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