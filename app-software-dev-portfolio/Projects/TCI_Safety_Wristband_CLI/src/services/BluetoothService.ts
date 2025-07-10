import { NativeModules, NativeEventEmitter } from 'react-native';

interface WristbandDevice {
  id: string;
  name: string;
  address: string;
  rssi: number;
  isConnected: boolean;
  batteryLevel: number;
  signalStrength: number;
  lastSeen: number;
}

interface EnvironmentalData {
  temperature: number;
  pressure: number;
  waterDepth?: number;
  uvIndex: number;
  humidity: number;
}

interface BluetoothServiceInterface {
  startScan(): Promise<void>;
  stopScan(): Promise<void>;
  connectToDevice(deviceId: string): Promise<boolean>;
  disconnectFromDevice(deviceId: string): Promise<void>;
  getConnectedDevices(): Promise<WristbandDevice[]>;
  readEnvironmentalData(deviceId: string): Promise<EnvironmentalData>;
  readBatteryLevel(deviceId: string): Promise<number>;
  sendEmergencyAlert(deviceId: string): Promise<boolean>;
}

class BluetoothService implements BluetoothServiceInterface {
  private bleModule: any;
  private eventEmitter: NativeEventEmitter;
  private isScanning: boolean = false;
  private connectedDevices: Map<string, WristbandDevice> = new Map();

  constructor() {
    this.bleModule = NativeModules.BluetoothModule;
    this.eventEmitter = new NativeEventEmitter(this.bleModule);
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Device discovered
    this.eventEmitter.addListener('deviceDiscovered', (device: WristbandDevice) => {
      console.log('Device discovered:', device.name);
      if (device.name?.includes('TCI-Wristband')) {
        this.connectedDevices.set(device.id, device);
      }
    });

    // Device connected
    this.eventEmitter.addListener('deviceConnected', (deviceId: string) => {
      console.log('Device connected:', deviceId);
      const device = this.connectedDevices.get(deviceId);
      if (device) {
        device.isConnected = true;
        device.lastSeen = Date.now();
      }
    });

    // Device disconnected
    this.eventEmitter.addListener('deviceDisconnected', (deviceId: string) => {
      console.log('Device disconnected:', deviceId);
      const device = this.connectedDevices.get(deviceId);
      if (device) {
        device.isConnected = false;
      }
    });

    // Battery level update
    this.eventEmitter.addListener('batteryLevelUpdate', (data: { deviceId: string, level: number }) => {
      const device = this.connectedDevices.get(data.deviceId);
      if (device) {
        device.batteryLevel = data.level;
      }
    });

    // Environmental data update
    this.eventEmitter.addListener('environmentalDataUpdate', (data: { deviceId: string, data: EnvironmentalData }) => {
      console.log('Environmental data from', data.deviceId, ':', data.data);
    });
  }

  async startScan(): Promise<void> {
    try {
      await this.bleModule.startScan();
      this.isScanning = true;
      console.log('Bluetooth scan started');
    } catch (error) {
      console.error('Bluetooth scan start error:', error);
      throw error;
    }
  }

  async stopScan(): Promise<void> {
    try {
      await this.bleModule.stopScan();
      this.isScanning = false;
      console.log('Bluetooth scan stopped');
    } catch (error) {
      console.error('Bluetooth scan stop error:', error);
      throw error;
    }
  }

  async connectToDevice(deviceId: string): Promise<boolean> {
    try {
      const success = await this.bleModule.connectToDevice(deviceId);
      if (success) {
        console.log('Connected to device:', deviceId);
        const device = this.connectedDevices.get(deviceId);
        if (device) {
          device.isConnected = true;
          device.lastSeen = Date.now();
        }
      }
      return success;
    } catch (error) {
      console.error('Device connection error:', error);
      return false;
    }
  }

  async disconnectFromDevice(deviceId: string): Promise<void> {
    try {
      await this.bleModule.disconnectFromDevice(deviceId);
      console.log('Disconnected from device:', deviceId);
      const device = this.connectedDevices.get(deviceId);
      if (device) {
        device.isConnected = false;
      }
    } catch (error) {
      console.error('Device disconnection error:', error);
      throw error;
    }
  }

  async getConnectedDevices(): Promise<WristbandDevice[]> {
    return Array.from(this.connectedDevices.values());
  }

  async readEnvironmentalData(deviceId: string): Promise<EnvironmentalData> {
    try {
      const data = await this.bleModule.readEnvironmentalData(deviceId);
      return {
        temperature: data.temperature,
        pressure: data.pressure,
        waterDepth: data.waterDepth,
        uvIndex: data.uvIndex,
        humidity: data.humidity
      };
    } catch (error) {
      console.error('Environmental data read error:', error);
      throw error;
    }
  }

  async readBatteryLevel(deviceId: string): Promise<number> {
    try {
      return await this.bleModule.readBatteryLevel(deviceId);
    } catch (error) {
      console.error('Battery level read error:', error);
      return 0;
    }
  }

  async sendEmergencyAlert(deviceId: string): Promise<boolean> {
    try {
      const success = await this.bleModule.sendEmergencyAlert(deviceId);
      if (success) {
        console.log('Emergency alert sent to device:', deviceId);
      }
      return success;
    } catch (error) {
      console.error('Emergency alert error:', error);
      return false;
    }
  }

  // Get signal strength for a device
  async getSignalStrength(deviceId: string): Promise<number> {
    try {
      return await this.bleModule.getSignalStrength(deviceId);
    } catch (error) {
      console.error('Signal strength error:', error);
      return 0;
    }
  }

  // Check if Bluetooth is enabled
  async isBluetoothEnabled(): Promise<boolean> {
    try {
      return await this.bleModule.isBluetoothEnabled();
    } catch (error) {
      console.error('Bluetooth status check error:', error);
      return false;
    }
  }

  // Request Bluetooth permissions
  async requestPermissions(): Promise<boolean> {
    try {
      return await this.bleModule.requestPermissions();
    } catch (error) {
      console.error('Bluetooth permissions error:', error);
      return false;
    }
  }

  // Clean up event listeners
  cleanup(): void {
    this.eventEmitter.removeAllListeners('deviceDiscovered');
    this.eventEmitter.removeAllListeners('deviceConnected');
    this.eventEmitter.removeAllListeners('deviceDisconnected');
    this.eventEmitter.removeAllListeners('batteryLevelUpdate');
    this.eventEmitter.removeAllListeners('environmentalDataUpdate');
  }
}

export default new BluetoothService(); 