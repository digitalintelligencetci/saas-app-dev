import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Download, Share, FileText, Calendar, MapPin, Clock } from 'lucide-react-native';

interface Report {
  id: string;
  title: string;
  date: string;
  location: string;
  type: 'rf' | 'thermal' | 'combined';
  deviceCount: number;
  duration: string;
  status: 'draft' | 'completed' | 'exported';
}

export default function ReportsScreen() {
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      title: 'Building A - Floor 3 Scan',
      date: '2025-01-20',
      location: 'Office Complex A',
      type: 'combined',
      deviceCount: 12,
      duration: '45 min',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Warehouse RF Survey',
      date: '2025-01-19',
      location: 'Warehouse District',
      type: 'rf',
      deviceCount: 8,
      duration: '30 min',
      status: 'completed'
    },
    {
      id: '3',
      title: 'Thermal Analysis - Server Room',
      date: '2025-01-18',
      location: 'Data Center B',
      type: 'thermal',
      deviceCount: 15,
      duration: '25 min',
      status: 'exported'
    },
    {
      id: '4',
      title: 'Emergency Response - Apt 4B',
      date: '2025-01-17',
      location: 'Residential Building',
      type: 'combined',
      deviceCount: 6,
      duration: '20 min',
      status: 'draft'
    }
  ]);

  const createNewReport = () => {
    const newReport: Report = {
      id: Date.now().toString(),
      title: `New Scan Report ${reports.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      location: 'Current Location',
      type: 'combined',
      deviceCount: 0,
      duration: '0 min',
      status: 'draft'
    };
    setReports([newReport, ...reports]);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'rf': return '#3B82F6';
      case 'thermal': return '#EF4444';
      case 'combined': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'exported': return '#3B82F6';
      case 'draft': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const exportReport = (reportId: string) => {
    Alert.alert(
      'Export Report',
      'Choose export format:',
      [
        { text: 'PDF Report', onPress: () => handleExport(reportId, 'pdf') },
        { text: 'CSV Data', onPress: () => handleExport(reportId, 'csv') },
        { text: 'JSON Evidence', onPress: () => handleExport(reportId, 'json') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleExport = (reportId: string, format: string) => {
    // Simulate export process
    Alert.alert('Export Complete', `Report exported as ${format.toUpperCase()} file`);
    setReports(reports.map(r => 
      r.id === reportId ? { ...r, status: 'exported' as const } : r
    ));
  };

  const shareReport = (reportId: string) => {
    Alert.alert(
      'Share Report',
      'Share options:',
      [
        { text: 'Email', onPress: () => Alert.alert('Email', 'Report shared via email') },
        { text: 'Cloud Storage', onPress: () => Alert.alert('Cloud', 'Report uploaded to cloud') },
        { text: 'Secure Transfer', onPress: () => Alert.alert('Secure', 'Report sent via secure channel') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Evidence Reports</Text>
        <Text style={styles.subtitle}>Automated Documentation & Export</Text>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{reports.length}</Text>
          <Text style={styles.summaryLabel}>Total Reports</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{reports.filter(r => r.status === 'completed').length}</Text>
          <Text style={styles.summaryLabel}>Completed</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{reports.filter(r => r.status === 'exported').length}</Text>
          <Text style={styles.summaryLabel}>Exported</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.createButton} onPress={createNewReport}>
        <Plus size={24} color="#FFF" />
        <Text style={styles.createButtonText}>Create New Report</Text>
      </TouchableOpacity>

      <ScrollView style={styles.reportsList}>
        <Text style={styles.sectionTitle}>Recent Reports</Text>
        {reports.map((report) => (
          <View key={report.id} style={styles.reportItem}>
            <View style={styles.reportHeader}>
              <View style={styles.reportTitleContainer}>
                <Text style={styles.reportTitle}>{report.title}</Text>
                <View style={styles.reportMeta}>
                  <View style={[styles.typeTag, { backgroundColor: getTypeColor(report.type) }]}>
                    <Text style={styles.typeTagText}>{report.type.toUpperCase()}</Text>
                  </View>
                  <View style={[styles.statusTag, { backgroundColor: getStatusColor(report.status) }]}>
                    <Text style={styles.statusTagText}>{report.status.toUpperCase()}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.reportDetails}>
              <View style={styles.detailRow}>
                <Calendar size={16} color="#94A3B8" />
                <Text style={styles.detailText}>{report.date}</Text>
              </View>
              <View style={styles.detailRow}>
                <MapPin size={16} color="#94A3B8" />
                <Text style={styles.detailText}>{report.location}</Text>
              </View>
              <View style={styles.detailRow}>
                <Clock size={16} color="#94A3B8" />
                <Text style={styles.detailText}>{report.duration}</Text>
              </View>
            </View>

            <View style={styles.reportStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{report.deviceCount}</Text>
                <Text style={styles.statLabel}>Devices</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {report.status === 'completed' ? '100' : report.status === 'exported' ? '100' : '0'}%
                </Text>
                <Text style={styles.statLabel}>Complete</Text>
              </View>
            </View>

            <View style={styles.reportActions}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => Alert.alert('View Report', `Opening ${report.title}`)}
              >
                <FileText size={16} color="#3B82F6" />
                <Text style={styles.actionButtonText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => exportReport(report.id)}
                disabled={report.status === 'draft'}
              >
                <Download size={16} color={report.status === 'draft' ? '#6B7280' : '#10B981'} />
                <Text style={[styles.actionButtonText, report.status === 'draft' && styles.actionButtonDisabled]}>
                  Export
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => shareReport(report.id)}
                disabled={report.status === 'draft'}
              >
                <Share size={16} color={report.status === 'draft' ? '#6B7280' : '#F59E0B'} />
                <Text style={[styles.actionButtonText, report.status === 'draft' && styles.actionButtonDisabled]}>
                  Share
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginLeft: 8,
  },
  reportsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 12,
  },
  reportItem: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  reportHeader: {
    marginBottom: 12,
  },
  reportTitleContainer: {
    marginBottom: 8,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  reportMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFF',
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFF',
  },
  reportDetails: {
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
  reportStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
  },
  reportActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#374151',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
    color: '#F8FAFC',
  },
  actionButtonDisabled: {
    color: '#6B7280',
  },
});