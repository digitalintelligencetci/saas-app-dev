import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Users, MessageCircle, Share2, MapPin, Clock, TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'offline' | 'scanning';
  location?: { lat: number; lng: number };
  lastSeen: string;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'location' | 'alert' | 'data';
}

interface CollaborationPanelProps {
  teamMembers: TeamMember[];
  messages: Message[];
  onSendMessage: (message: string) => void;
  onShareLocation: () => void;
  onSendAlert: (alertType: string) => void;
}

export default function CollaborationPanel({
  teamMembers,
  messages,
  onSendMessage,
  onShareLocation,
  onSendAlert
}: CollaborationPanelProps) {
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'team' | 'chat' | 'alerts'>('team');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#10B981';
      case 'scanning': return '#3B82F6';
      case 'offline': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Available';
      case 'scanning': return 'Scanning';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const renderTeamTab = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Active Team Members ({teamMembers.filter(m => m.status !== 'offline').length})</Text>
      {teamMembers.map((member) => (
        <View key={member.id} style={styles.memberItem}>
          <View style={styles.memberHeader}>
            <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(member.status) }]} />
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberRole}>{member.role}</Text>
            </View>
            <View style={styles.memberStatus}>
              <Text style={[styles.statusText, { color: getStatusColor(member.status) }]}>
                {getStatusText(member.status)}
              </Text>
              <Text style={styles.lastSeen}>{member.lastSeen}</Text>
            </View>
          </View>
          <View style={styles.memberActions}>
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle size={16} color="#3B82F6" />
              <Text style={styles.actionText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MapPin size={16} color="#10B981" />
              <Text style={styles.actionText}>Locate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Share2 size={16} color="#F59E0B" />
              <Text style={styles.actionText}>Share Data</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderChatTab = () => (
    <View style={styles.chatContainer}>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((message) => (
          <View key={message.id} style={styles.messageItem}>
            <View style={styles.messageHeader}>
              <Text style={styles.senderName}>{message.senderName}</Text>
              <Text style={styles.messageTime}>{message.timestamp}</Text>
            </View>
            <Text style={styles.messageContent}>{message.content}</Text>
            {message.type !== 'text' && (
              <View style={[styles.messageType, { backgroundColor: getMessageTypeColor(message.type) }]}>
                <Text style={styles.messageTypeText}>{message.type.toUpperCase()}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.messageInput}>
        <TextInput
          style={styles.textInput}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          placeholderTextColor="#64748B"
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickAction} onPress={onShareLocation}>
          <MapPin size={16} color="#FFF" />
          <Text style={styles.quickActionText}>Share Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAction} onPress={() => onSendAlert('backup')}>
          <AlertTriangle size={16} color="#FFF" />
          <Text style={styles.quickActionText}>Request Backup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAlertsTab = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Quick Alerts</Text>
      <View style={styles.alertsGrid}>
        <TouchableOpacity 
          style={[styles.alertButton, { backgroundColor: '#EF4444' }]}
          onPress={() => onSendAlert('emergency')}
        >
          <AlertTriangle size={24} color="#FFF" />
          <Text style={styles.alertButtonText}>Emergency</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.alertButton, { backgroundColor: '#F59E0B' }]}
          onPress={() => onSendAlert('backup')}
        >
          <Users size={24} color="#FFF" />
          <Text style={styles.alertButtonText}>Need Backup</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.alertButton, { backgroundColor: '#3B82F6' }]}
          onPress={() => onSendAlert('found')}
        >
          <MapPin size={24} color="#FFF" />
          <Text style={styles.alertButtonText}>Target Found</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.alertButton, { backgroundColor: '#10B981' }]}
          onPress={() => onSendAlert('clear')}
        >
          <Clock size={24} color="#FFF" />
          <Text style={styles.alertButtonText}>Area Clear</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'location': return '#10B981';
      case 'alert': return '#EF4444';
      case 'data': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Team Collaboration</Text>
        <View style={styles.onlineIndicator}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>
            {teamMembers.filter(m => m.status !== 'offline').length} online
          </Text>
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'team' && styles.activeTab]}
          onPress={() => setActiveTab('team')}
        >
          <Users size={20} color={activeTab === 'team' ? '#3B82F6' : '#94A3B8'} />
          <Text style={[styles.tabText, activeTab === 'team' && styles.activeTabText]}>Team</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'chat' && styles.activeTab]}
          onPress={() => setActiveTab('chat')}
        >
          <MessageCircle size={20} color={activeTab === 'chat' ? '#3B82F6' : '#94A3B8'} />
          <Text style={[styles.tabText, activeTab === 'chat' && styles.activeTabText]}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'alerts' && styles.activeTab]}
          onPress={() => setActiveTab('alerts')}
        >
          <AlertTriangle size={20} color={activeTab === 'alerts' ? '#3B82F6' : '#94A3B8'} />
          <Text style={[styles.tabText, activeTab === 'alerts' && styles.activeTabText]}>Alerts</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'team' && renderTeamTab()}
      {activeTab === 'chat' && renderChatTab()}
      {activeTab === 'alerts' && renderAlertsTab()}
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
  onlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  onlineText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#374151',
  },
  tabText: {
    fontSize: 14,
    color: '#94A3B8',
    marginLeft: 6,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#3B82F6',
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 16,
  },
  memberItem: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 2,
  },
  memberRole: {
    fontSize: 12,
    color: '#94A3B8',
  },
  memberStatus: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  lastSeen: {
    fontSize: 10,
    color: '#64748B',
  },
  memberActions: {
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
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    padding: 20,
  },
  messageItem: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3B82F6',
  },
  messageTime: {
    fontSize: 10,
    color: '#64748B',
  },
  messageContent: {
    fontSize: 14,
    color: '#F8FAFC',
    marginBottom: 6,
  },
  messageType: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  messageTypeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFF',
  },
  messageInput: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#1E293B',
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#374151',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#F8FAFC',
    marginRight: 8,
    maxHeight: 80,
  },
  sendButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  quickAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#374151',
    paddingVertical: 8,
    borderRadius: 6,
  },
  quickActionText: {
    color: '#FFF',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '600',
  },
  alertsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  alertButton: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  alertButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
});