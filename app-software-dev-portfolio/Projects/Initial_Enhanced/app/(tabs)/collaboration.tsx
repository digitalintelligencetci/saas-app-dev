import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CollaborationPanel from '@/components/CollaborationPanel';

export default function CollaborationScreen() {
  const [teamMembers, setTeamMembers] = useState([
    {
      id: '1',
      name: 'Officer Johnson',
      role: 'Lead Investigator',
      status: 'scanning' as const,
      location: { lat: 40.7128, lng: -74.0060 },
      lastSeen: '2 min ago'
    },
    {
      id: '2',
      name: 'Detective Smith',
      role: 'Evidence Specialist',
      status: 'online' as const,
      location: { lat: 40.7589, lng: -73.9851 },
      lastSeen: '5 min ago'
    },
    {
      id: '3',
      name: 'Officer Davis',
      role: 'Technical Support',
      status: 'online' as const,
      lastSeen: '1 min ago'
    },
    {
      id: '4',
      name: 'Sergeant Wilson',
      role: 'Field Supervisor',
      status: 'offline' as const,
      lastSeen: '15 min ago'
    }
  ]);

  const [messages, setMessages] = useState([
    {
      id: '1',
      senderId: '1',
      senderName: 'Officer Johnson',
      content: 'Starting scan of Building A, Floor 3',
      timestamp: '10:15 AM',
      type: 'text' as const
    },
    {
      id: '2',
      senderId: '2',
      senderName: 'Detective Smith',
      content: 'Roger that. I\'m positioned at the main entrance.',
      timestamp: '10:16 AM',
      type: 'text' as const
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'Officer Johnson',
      content: 'Multiple RF signals detected in conference room',
      timestamp: '10:18 AM',
      type: 'alert' as const
    },
    {
      id: '4',
      senderId: '3',
      senderName: 'Officer Davis',
      content: 'Shared current location',
      timestamp: '10:20 AM',
      type: 'location' as const
    }
  ]);

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      senderId: 'current-user',
      senderName: 'You',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text' as const
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleShareLocation = () => {
    const locationMessage = {
      id: Date.now().toString(),
      senderId: 'current-user',
      senderName: 'You',
      content: 'Shared current location: 40.7128, -74.0060',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'location' as const
    };
    setMessages(prev => [...prev, locationMessage]);
    Alert.alert('Location Shared', 'Your current location has been shared with the team');
  };

  const handleSendAlert = (alertType: string) => {
    const alertMessages = {
      emergency: 'EMERGENCY: Immediate assistance required!',
      backup: 'Requesting backup at current location',
      found: 'Target device/evidence found',
      clear: 'Area cleared, no threats detected'
    };

    const alertMessage = {
      id: Date.now().toString(),
      senderId: 'current-user',
      senderName: 'You',
      content: alertMessages[alertType as keyof typeof alertMessages] || 'Alert sent',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'alert' as const
    };
    setMessages(prev => [...prev, alertMessage]);
    Alert.alert('Alert Sent', `${alertType.toUpperCase()} alert has been sent to all team members`);
  };

  useEffect(() => {
    // Simulate incoming messages
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const randomMember = teamMembers[Math.floor(Math.random() * teamMembers.length)];
        const randomMessages = [
          'Status update: All clear in my sector',
          'Found suspicious device, investigating',
          'Moving to next checkpoint',
          'RF interference detected',
          'Thermal signature confirmed'
        ];
        
        const newMessage = {
          id: Date.now().toString(),
          senderId: randomMember.id,
          senderName: randomMember.name,
          content: randomMessages[Math.floor(Math.random() * randomMessages.length)],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text' as const
        };
        setMessages(prev => [...prev, newMessage]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [teamMembers]);

  return (
    <SafeAreaView style={styles.container}>
      <CollaborationPanel
        teamMembers={teamMembers}
        messages={messages}
        onSendMessage={handleSendMessage}
        onShareLocation={handleShareLocation}
        onSendAlert={handleSendAlert}
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