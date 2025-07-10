import { NativeModules } from 'react-native';
import GPSService from './GPSService';

interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

interface UserInfo {
  name: string;
  age: number;
  bloodType: string;
  emergencyContacts: EmergencyContact[];
  medicalConditions?: string[];
  allergies?: string[];
}

interface EmergencyAlert {
  deviceId: string;
  location: {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude?: number;
  };
  userInfo: UserInfo;
  timestamp: string;
  alertType: 'SOS' | 'FALL' | 'WATER' | 'MEDICAL';
  environmentalData?: {
    temperature: number;
    pressure: number;
    waterDepth?: number;
    uvIndex: number;
  };
  batteryLevel: number;
  signalStrength: number;
}

interface EmergencyResponse {
  success: boolean;
  alertId: string;
  responseTime: number;
  estimatedArrival?: number;
  message?: string;
}

class EmergencyService {
  private emergencyModule: any;
  private apiBaseUrl: string = 'https://api.tci-emergency.gov.tc';
  private apiKey: string = 'YOUR_TCI_EMERGENCY_API_KEY';
  private fallbackNumbers: string[] = [
    '+1-649-946-9111', // TCI Emergency Services
    '+1-649-946-4251', // TCI Police
    '+1-649-946-4444'  // TCI Fire & Rescue
  ];

  constructor() {
    this.emergencyModule = NativeModules.EmergencyModule;
  }

  /**
   * Send SOS emergency alert
   */
  async sendSOSAlert(userInfo: UserInfo, deviceId: string): Promise<EmergencyResponse> {
    try {
      // Get current location
      const location = await GPSService.getCurrentLocation();
      
      // Create emergency alert
      const alert: EmergencyAlert = {
        deviceId,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          accuracy: location.accuracy,
          altitude: location.altitude
        },
        userInfo,
        timestamp: new Date().toISOString(),
        alertType: 'SOS',
        batteryLevel: 85, // Get from device
        signalStrength: 92 // Get from device
      };

      // Try API first
      const response = await this.sendToEmergencyAPI(alert);
      
      if (response.success) {
        console.log('Emergency alert sent via API:', response.alertId);
        return response;
      }

      // Fallback to SMS/voice
      console.log('API failed, using fallback methods');
      return await this.sendFallbackAlert(alert);

    } catch (error) {
      console.error('SOS alert error:', error);
      throw error;
    }
  }

  /**
   * Send alert to TCI Emergency Services API
   */
  private async sendToEmergencyAPI(alert: EmergencyAlert): Promise<EmergencyResponse> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/emergency/sos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-Device-ID': alert.deviceId,
          'X-Emergency-Type': alert.alertType
        },
        body: JSON.stringify(alert)
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          alertId: data.alertId,
          responseTime: data.responseTime,
          estimatedArrival: data.estimatedArrival,
          message: data.message
        };
      } else {
        console.error('Emergency API error:', response.status, response.statusText);
        return { success: false, alertId: '', responseTime: 0 };
      }
    } catch (error) {
      console.error('Emergency API request failed:', error);
      return { success: false, alertId: '', responseTime: 0 };
    }
  }

  /**
   * Fallback alert methods (SMS/voice)
   */
  private async sendFallbackAlert(alert: EmergencyAlert): Promise<EmergencyResponse> {
    try {
      // Send SMS to emergency contacts
      await this.sendSMSToContacts(alert);
      
      // Make voice call to emergency services
      await this.callEmergencyServices(alert);
      
      return {
        success: true,
        alertId: `fallback-${Date.now()}`,
        responseTime: 5000, // 5 seconds for fallback
        message: 'Alert sent via SMS and voice call'
      };
    } catch (error) {
      console.error('Fallback alert error:', error);
      return { success: false, alertId: '', responseTime: 0 };
    }
  }

  /**
   * Send SMS to emergency contacts
   */
  private async sendSMSToContacts(alert: EmergencyAlert): Promise<void> {
    const message = this.formatEmergencySMS(alert);
    
    for (const contact of alert.userInfo.emergencyContacts) {
      try {
        await this.emergencyModule.sendSMS(contact.phone, message);
        console.log('SMS sent to:', contact.name);
      } catch (error) {
        console.error('SMS send error:', error);
      }
    }
  }

  /**
   * Call emergency services
   */
  private async callEmergencyServices(alert: EmergencyAlert): Promise<void> {
    try {
      // Call primary emergency number
      await this.emergencyModule.makeEmergencyCall(
        this.fallbackNumbers[0],
        this.formatEmergencyCall(alert)
      );
      console.log('Emergency call initiated');
    } catch (error) {
      console.error('Emergency call error:', error);
    }
  }

  /**
   * Format emergency SMS message
   */
  private formatEmergencySMS(alert: EmergencyAlert): string {
    return `🚨 EMERGENCY ALERT 🚨
${alert.userInfo.name} has activated SOS alert.
Location: ${alert.location.latitude.toFixed(4)}, ${alert.location.longitude.toFixed(4)}
Time: ${new Date(alert.timestamp).toLocaleString()}
Device: ${alert.deviceId}
Battery: ${alert.batteryLevel}%
Signal: ${alert.signalStrength}%
Please respond immediately.`;
  }

  /**
   * Format emergency call data
   */
  private formatEmergencyCall(alert: EmergencyAlert): string {
    return JSON.stringify({
      type: 'SOS_ALERT',
      user: alert.userInfo.name,
      location: `${alert.location.latitude},${alert.location.longitude}`,
      device: alert.deviceId,
      timestamp: alert.timestamp
    });
  }

  /**
   * Send fall detection alert
   */
  async sendFallAlert(userInfo: UserInfo, deviceId: string): Promise<EmergencyResponse> {
    const location = await GPSService.getCurrentLocation();
    
    const alert: EmergencyAlert = {
      deviceId,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy
      },
      userInfo,
      timestamp: new Date().toISOString(),
      alertType: 'FALL',
      batteryLevel: 85,
      signalStrength: 92
    };

    return await this.sendToEmergencyAPI(alert);
  }

  /**
   * Send water emergency alert
   */
  async sendWaterAlert(userInfo: UserInfo, deviceId: string, waterDepth: number): Promise<EmergencyResponse> {
    const location = await GPSService.getCurrentLocation();
    
    const alert: EmergencyAlert = {
      deviceId,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy
      },
      userInfo,
      timestamp: new Date().toISOString(),
      alertType: 'WATER',
      environmentalData: {
        temperature: 28.5,
        pressure: 1013.25,
        waterDepth,
        uvIndex: 8
      },
      batteryLevel: 85,
      signalStrength: 92
    };

    return await this.sendToEmergencyAPI(alert);
  }

  /**
   * Check emergency services status
   */
  async checkEmergencyServicesStatus(): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/status`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return response.ok;
    } catch (error) {
      console.error('Emergency services status check failed:', error);
      return false;
    }
  }

  /**
   * Get emergency response time estimate
   */
  async getResponseTimeEstimate(location: { latitude: number; longitude: number }): Promise<number> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/response-time`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({ location })
      });

      if (response.ok) {
        const data = await response.json();
        return data.estimatedResponseTime; // in seconds
      }
      return 300; // 5 minutes default
    } catch (error) {
      console.error('Response time estimate failed:', error);
      return 300; // 5 minutes default
    }
  }
}

export default new EmergencyService(); 