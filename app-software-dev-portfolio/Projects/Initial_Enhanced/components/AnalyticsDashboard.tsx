import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-svg';
import { TrendingUp, Activity, Zap, Thermometer } from 'lucide-react-native';

interface AnalyticsData {
  rfDetections: number[];
  thermalReadings: number[];
  deviceTypes: { name: string; count: number; color: string }[];
  timeLabels: string[];
  threatLevels: { low: number; medium: number; high: number };
}

interface AnalyticsDashboardProps {
  data: AnalyticsData;
}

const { width } = Dimensions.get('window');
const chartWidth = width - 60;

export default function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
  const renderMetricCard = (title: string, value: string, icon: React.ReactNode, color: string) => (
    <View style={[styles.metricCard, { borderLeftColor: color }]}>
      <View style={styles.metricHeader}>
        <View style={[styles.metricIcon, { backgroundColor: color + '20' }]}>
          {icon}
        </View>
        <Text style={styles.metricTitle}>{title}</Text>
      </View>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
    </View>
  );

  const renderThreatLevelChart = () => {
    const total = data.threatLevels.low + data.threatLevels.medium + data.threatLevels.high;
    const lowPercent = (data.threatLevels.low / total) * 100;
    const mediumPercent = (data.threatLevels.medium / total) * 100;
    const highPercent = (data.threatLevels.high / total) * 100;

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Threat Level Distribution</Text>
        <View style={styles.threatChart}>
          <View style={[styles.threatBar, { flex: lowPercent, backgroundColor: '#10B981' }]} />
          <View style={[styles.threatBar, { flex: mediumPercent, backgroundColor: '#F59E0B' }]} />
          <View style={[styles.threatBar, { flex: highPercent, backgroundColor: '#EF4444' }]} />
        </View>
        <View style={styles.threatLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#10B981' }]} />
            <Text style={styles.legendText}>Low ({data.threatLevels.low})</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#F59E0B' }]} />
            <Text style={styles.legendText}>Medium ({data.threatLevels.medium})</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#EF4444' }]} />
            <Text style={styles.legendText}>High ({data.threatLevels.high})</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Analytics Dashboard</Text>
      
      <View style={styles.metricsGrid}>
        {renderMetricCard(
          'Total RF Signals',
          data.rfDetections.reduce((a, b) => a + b, 0).toString(),
          <Zap size={20} color="#3B82F6" />,
          '#3B82F6'
        )}
        {renderMetricCard(
          'Thermal Readings',
          data.thermalReadings.reduce((a, b) => a + b, 0).toString(),
          <Thermometer size={20} color="#EF4444" />,
          '#EF4444'
        )}
        {renderMetricCard(
          'Active Devices',
          data.deviceTypes.reduce((a, b) => a + b.count, 0).toString(),
          <Activity size={20} color="#10B981" />,
          '#10B981'
        )}
        {renderMetricCard(
          'Scan Efficiency',
          '94.2%',
          <TrendingUp size={20} color="#8B5CF6" />,
          '#8B5CF6'
        )}
      </View>

      {renderThreatLevelChart()}

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Device Type Distribution</Text>
        <View style={styles.deviceTypeChart}>
          {data.deviceTypes.map((device, index) => (
            <View key={index} style={styles.deviceTypeItem}>
              <View style={[styles.deviceTypeBar, { backgroundColor: device.color, width: `${(device.count / 20) * 100}%` }]} />
              <Text style={styles.deviceTypeLabel}>{device.name}: {device.count}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Detection Timeline</Text>
        <View style={styles.timelineChart}>
          {data.timeLabels.map((time, index) => (
            <View key={index} style={styles.timelineItem}>
              <View style={styles.timelineBar}>
                <View 
                  style={[
                    styles.timelineRF, 
                    { height: `${(data.rfDetections[index] / 10) * 100}%` }
                  ]} 
                />
                <View 
                  style={[
                    styles.timelineThermal, 
                    { height: `${(data.thermalReadings[index] / 10) * 100}%` }
                  ]} 
                />
              </View>
              <Text style={styles.timelineLabel}>{time}</Text>
            </View>
          ))}
        </View>
        <View style={styles.timelineLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#3B82F6' }]} />
            <Text style={styles.legendText}>RF Signals</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#EF4444' }]} />
            <Text style={styles.legendText}>Thermal</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 20,
    textAlign: 'center',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  metricTitle: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 40,
  },
  chartContainer: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 16,
    textAlign: 'center',
  },
  threatChart: {
    flexDirection: 'row',
    height: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  threatBar: {
    height: '100%',
  },
  threatLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    fontSize: 12,
    color: '#94A3B8',
  },
  deviceTypeChart: {
    gap: 8,
  },
  deviceTypeItem: {
    marginBottom: 8,
  },
  deviceTypeBar: {
    height: 20,
    borderRadius: 4,
    marginBottom: 4,
  },
  deviceTypeLabel: {
    fontSize: 12,
    color: '#94A3B8',
  },
  timelineChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: 12,
  },
  timelineItem: {
    alignItems: 'center',
    flex: 1,
  },
  timelineBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 80,
    width: 20,
    marginBottom: 8,
  },
  timelineRF: {
    backgroundColor: '#3B82F6',
    width: 8,
    marginRight: 2,
    borderRadius: 2,
  },
  timelineThermal: {
    backgroundColor: '#EF4444',
    width: 8,
    borderRadius: 2,
  },
  timelineLabel: {
    fontSize: 10,
    color: '#94A3B8',
    textAlign: 'center',
  },
  timelineLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
});