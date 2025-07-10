import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Shield, FileText, Clock, MapPin, User, Lock, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface EvidenceItem {
  id: string;
  type: 'scan' | 'photo' | 'report' | 'data';
  title: string;
  timestamp: string;
  location: { lat: number; lng: number; address: string };
  officer: string;
  hash: string;
  status: 'pending' | 'verified' | 'sealed' | 'transferred';
  chainOfCustody: ChainEvent[];
}

interface ChainEvent {
  id: string;
  action: 'created' | 'accessed' | 'modified' | 'transferred' | 'sealed';
  officer: string;
  timestamp: string;
  location: string;
  notes?: string;
}

interface EvidenceTrackerProps {
  evidenceItems: EvidenceItem[];
  onSealEvidence: (id: string) => void;
  onTransferEvidence: (id: string, recipient: string) => void;
  onVerifyIntegrity: (id: string) => void;
}

export default function EvidenceTracker({
  evidenceItems,
  onSealEvidence,
  onTransferEvidence,
  onVerifyIntegrity
}: EvidenceTrackerProps) {
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);
  const [showChainOfCustody, setShowChainOfCustody] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'verified': return '#3B82F6';
      case 'sealed': return '#10B981';
      case 'transferred': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} color="#F59E0B" />;
      case 'verified': return <CheckCircle size={16} color="#3B82F6" />;
      case 'sealed': return <Lock size={16} color="#10B981" />;
      case 'transferred': return <User size={16} color="#8B5CF6" />;
      default: return <AlertTriangle size={16} color="#6B7280" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'scan': return <Shield size={20} color="#3B82F6" />;
      case 'photo': return <FileText size={20} color="#10B981" />;
      case 'report': return <FileText size={20} color="#F59E0B" />;
      case 'data': return <Shield size={20} color="#8B5CF6" />;
      default: return <FileText size={20} color="#6B7280" />;
    }
  };

  const handleSealEvidence = (id: string) => {
    Alert.alert(
      'Seal Evidence',
      'This action will permanently seal this evidence item. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Seal', onPress: () => onSealEvidence(id) }
      ]
    );
  };

  const handleTransferEvidence = (id: string) => {
    Alert.alert(
      'Transfer Evidence',
      'Enter recipient details:',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Transfer', onPress: () => onTransferEvidence(id, 'Detective Smith') }
      ]
    );
  };

  const renderEvidenceList = () => (
    <ScrollView style={styles.evidenceList}>
      <Text style={styles.sectionTitle}>Evidence Items ({evidenceItems.length})</Text>
      {evidenceItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.evidenceItem,
            selectedEvidence?.id === item.id && styles.selectedItem
          ]}
          onPress={() => setSelectedEvidence(item)}
        >
          <View style={styles.evidenceHeader}>
            <View style={styles.evidenceIcon}>
              {getTypeIcon(item.type)}
            </View>
            <View style={styles.evidenceInfo}>
              <Text style={styles.evidenceTitle}>{item.title}</Text>
              <Text style={styles.evidenceOfficer}>Officer: {item.officer}</Text>
            </View>
            <View style={styles.evidenceStatus}>
              {getStatusIcon(item.status)}
              <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                {item.status.toUpperCase()}
              </Text>
            </View>
          </View>
          
          <View style={styles.evidenceDetails}>
            <View style={styles.detailRow}>
              <Clock size={14} color="#94A3B8" />
              <Text style={styles.detailText}>{item.timestamp}</Text>
            </View>
            <View style={styles.detailRow}>
              <MapPin size={14} color="#94A3B8" />
              <Text style={styles.detailText}>{item.location.address}</Text>
            </View>
            <View style={styles.detailRow}>
              <Shield size={14} color="#94A3B8" />
              <Text style={styles.detailText}>Hash: {item.hash.substring(0, 16)}...</Text>
            </View>
          </View>

          <View style={styles.evidenceActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => onVerifyIntegrity(item.id)}
            >
              <CheckCircle size={16} color="#10B981" />
              <Text style={styles.actionText}>Verify</Text>
            </TouchableOpacity>
            
            {item.status === 'verified' && (
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleSealEvidence(item.id)}
              >
                <Lock size={16} color="#3B82F6" />
                <Text style={styles.actionText}>Seal</Text>
              </TouchableOpacity>
            )}
            
            {item.status === 'sealed' && (
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleTransferEvidence(item.id)}
              >
                <User size={16} color="#8B5CF6" />
                <Text style={styles.actionText}>Transfer</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => {
                setSelectedEvidence(item);
                setShowChainOfCustody(true);
              }}
            >
              <FileText size={16} color="#F59E0B" />
              <Text style={styles.actionText}>Chain</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderChainOfCustody = () => (
    <ScrollView style={styles.chainContainer}>
      <View style={styles.chainHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setShowChainOfCustody(false)}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.chainTitle}>Chain of Custody</Text>
      </View>

      {selectedEvidence && (
        <>
          <View style={styles.evidenceSummary}>
            <Text style={styles.summaryTitle}>{selectedEvidence.title}</Text>
            <Text style={styles.summaryHash}>Hash: {selectedEvidence.hash}</Text>
            <Text style={styles.summaryLocation}>Location: {selectedEvidence.location.address}</Text>
          </View>

          <View style={styles.chainEvents}>
            <Text style={styles.sectionTitle}>Custody Events</Text>
            {selectedEvidence.chainOfCustody.map((event, index) => (
              <View key={event.id} style={styles.chainEvent}>
                <View style={styles.eventIndicator}>
                  <View style={[styles.eventDot, { backgroundColor: getEventColor(event.action) }]} />
                  {index < selectedEvidence.chainOfCustody.length - 1 && (
                    <View style={styles.eventLine} />
                  )}
                </View>
                <View style={styles.eventContent}>
                  <View style={styles.eventHeader}>
                    <Text style={styles.eventAction}>{event.action.toUpperCase()}</Text>
                    <Text style={styles.eventTime}>{event.timestamp}</Text>
                  </View>
                  <Text style={styles.eventOfficer}>Officer: {event.officer}</Text>
                  <Text style={styles.eventLocation}>Location: {event.location}</Text>
                  {event.notes && (
                    <Text style={styles.eventNotes}>Notes: {event.notes}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );

  const getEventColor = (action: string) => {
    switch (action) {
      case 'created': return '#10B981';
      case 'accessed': return '#3B82F6';
      case 'modified': return '#F59E0B';
      case 'transferred': return '#8B5CF6';
      case 'sealed': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Evidence Chain of Custody</Text>
        <View style={styles.integrityIndicator}>
          <Shield size={16} color="#10B981" />
          <Text style={styles.integrityText}>Integrity Verified</Text>
        </View>
      </View>

      {showChainOfCustody ? renderChainOfCustody() : renderEvidenceList()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  integrityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B98120',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  integrityText: {
    fontSize: 12,
    color: '#10B981',
    marginLeft: 4,
    fontWeight: '600',
  },
  evidenceList: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 16,
  },
  evidenceItem: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#374151',
  },
  selectedItem: {
    borderLeftColor: '#3B82F6',
    backgroundColor: '#1E40AF20',
  },
  evidenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  evidenceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  evidenceInfo: {
    flex: 1,
  },
  evidenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 2,
  },
  evidenceOfficer: {
    fontSize: 12,
    color: '#94A3B8',
  },
  evidenceStatus: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  evidenceDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 8,
  },
  evidenceActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#374151',
    borderRadius: 6,
  },
  actionText: {
    fontSize: 12,
    color: '#F8FAFC',
    marginLeft: 4,
    fontWeight: '600',
  },
  chainContainer: {
    flex: 1,
    padding: 20,
  },
  chainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '600',
  },
  chainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  evidenceSummary: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  summaryHash: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  summaryLocation: {
    fontSize: 12,
    color: '#94A3B8',
  },
  chainEvents: {
    flex: 1,
  },
  chainEvent: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  eventIndicator: {
    alignItems: 'center',
    marginRight: 16,
  },
  eventDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  eventLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#374151',
  },
  eventContent: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 8,
    padding: 12,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  eventAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F8FAFC',
  },
  eventTime: {
    fontSize: 12,
    color: '#94A3B8',
  },
  eventOfficer: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 2,
  },
  eventNotes: {
    fontSize: 12,
    color: '#94A3B8',
    fontStyle: 'italic',
  },
});