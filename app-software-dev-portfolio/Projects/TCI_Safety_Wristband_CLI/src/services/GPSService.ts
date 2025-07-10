import { NativeModules, NativeEventEmitter } from 'react-native';

interface GPSLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude?: number;
  speed?: number;
  timestamp: number;
}

interface GPSServiceInterface {
  startGPS(): Promise<void>;
  stopGPS(): Promise<void>;
  getCurrentLocation(): Promise<GPSLocation>;
  setUpdateInterval(seconds: number): Promise<void>;
  isGPSEnabled(): Promise<boolean>;
}

class GPSService implements GPSServiceInterface {
  private gpsModule: any;
  private eventEmitter: NativeEventEmitter;
  private isRunning: boolean = false;
  private updateInterval: number = 30; // 30 seconds default

  constructor() {
    this.gpsModule = NativeModules.GPSModule;
    this.eventEmitter = new NativeEventEmitter(this.gpsModule);
  }

  async startGPS(): Promise<void> {
    try {
      await this.gpsModule.startGPS(this.updateInterval);
      this.isRunning = true;
      console.log('GPS started with', this.updateInterval, 'second updates');
    } catch (error) {
      console.error('GPS start error:', error);
      throw error;
    }
  }

  async stopGPS(): Promise<void> {
    try {
      await this.gpsModule.stopGPS();
      this.isRunning = false;
      console.log('GPS stopped');
    } catch (error) {
      console.error('GPS stop error:', error);
      throw error;
    }
  }

  async getCurrentLocation(): Promise<GPSLocation> {
    try {
      const location = await this.gpsModule.getCurrentLocation();
      return {
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy,
        altitude: location.altitude,
        speed: location.speed,
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('GPS location error:', error);
      throw error;
    }
  }

  async setUpdateInterval(seconds: number): Promise<void> {
    this.updateInterval = seconds;
    if (this.isRunning) {
      await this.stopGPS();
      await this.startGPS();
    }
  }

  async isGPSEnabled(): Promise<boolean> {
    try {
      return await this.gpsModule.isGPSEnabled();
    } catch (error) {
      console.error('GPS status check error:', error);
      return false;
    }
  }

  // Listen for location updates
  onLocationUpdate(callback: (location: GPSLocation) => void): void {
    this.eventEmitter.addListener('onLocationUpdate', callback);
  }

  // Remove location listener
  removeLocationListener(): void {
    this.eventEmitter.removeAllListeners('onLocationUpdate');
  }

  // Get GPS signal quality
  async getSignalQuality(): Promise<number> {
    try {
      return await this.gpsModule.getSignalQuality();
    } catch (error) {
      console.error('GPS signal quality error:', error);
      return 0;
    }
  }

  // Get satellite count
  async getSatelliteCount(): Promise<number> {
    try {
      return await this.gpsModule.getSatelliteCount();
    } catch (error) {
      console.error('GPS satellite count error:', error);
      return 0;
    }
  }
}

export default new GPSService(); 