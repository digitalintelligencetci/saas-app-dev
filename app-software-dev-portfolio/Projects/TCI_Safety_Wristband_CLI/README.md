# TCI Safety Wristband - React Native CLI

A smart waterproof wristband companion app for maritime safety in the Turks and Caicos Islands, built with React Native CLI for maximum performance and hardware integration.

## 🏝️ Project Overview

The TCI Safety Wristband is a comprehensive safety solution designed specifically for the maritime environment of the Turks and Caicos Islands. Built with React Native CLI for direct hardware access and optimal performance.

### Key Features

- **🚨 Direct 911 Integration** - Immediate connection to TCI emergency services
- **📍 Real-time GPS Tracking** - 30-second location updates
- **🌊 Waterproof Design** - IP68 rating (30m depth)
- **🔋 Long Battery Life** - 7-14 days standby
- **📱 Companion App** - Real-time monitoring and alerts
- **🌤️ Weather Integration** - Local TCI weather data
- **👥 Emergency Contacts** - Direct communication system

## 📁 Project Structure

```
TCI_Safety_Wristband_CLI/
├── docs/                          # Complete documentation
│   ├── TCI_Wristband_Specification.md
│   ├── TCI_Wristband_Business_Plan.md
│   └── TCI_Market_Research.md
├── src/                           # Source code
│   ├── navigation/                # Navigation setup
│   │   └── AppNavigator.tsx       # Main navigation
│   ├── screens/                   # App screens
│   │   └── WristbandScreen.tsx    # Main wristband screen
│   ├── components/                # Reusable components
│   ├── services/                  # API and business logic
│   └── utils/                     # Utility functions
├── assets/                        # Static assets
├── android/                       # Android native code
├── ios/                          # iOS native code
├── package.json                   # Dependencies
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **React Native CLI** (`npm install -g @react-native-community/cli`)
- **Xcode** (for iOS development)
- **Android Studio** (for Android development)
- **Watchman** (for file watching)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TCI_Safety_Wristband_CLI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npm start
   ```

5. **Run on different platforms**
   ```bash
   # iOS Simulator
   npm run ios
   
   # Android Emulator
   npm run android
   
   # Physical iOS device
   npx react-native run-ios --device
   
   # Physical Android device
   npx react-native run-android --device
   ```

## 📱 App Features

### Emergency Response
- **SOS Button** - Immediate emergency alert
- **Direct 911 Call** - One-tap emergency calling
- **Location Sharing** - Real-time GPS coordinates
- **Medical Information** - Emergency responder access

### Device Management
- **Wristband Pairing** - Bluetooth device connection
- **Battery Monitoring** - Real-time battery status
- **Signal Strength** - Connectivity monitoring
- **Device Status** - Online/offline status tracking

### Safety Monitoring
- **Real-time Location** - Live GPS tracking
- **Environmental Data** - Temperature, pressure, UV index
- **Weather Alerts** - Local TCI weather conditions
- **Geofencing** - Safe zone monitoring

### User Management
- **Profile Setup** - Personal information and medical data
- **Emergency Contacts** - Family and friend contacts
- **Usage History** - Activity and location history
- **Settings** - App preferences and configurations

## 🏗️ Technical Architecture

### Hardware Integration
- **GPS Module** - High-precision GPS with GLONASS support
- **Cellular Modem** - 4G LTE (Digicel/Flow TCI networks)
- **Satellite Backup** - Iridium/Globalstar for offshore areas
- **Accelerometer** - 3-axis for fall detection
- **Pressure Sensor** - Depth monitoring (0-50m)
- **Battery** - 2000mAh Li-ion with 7-14 days standby

### Software Stack
- **Frontend** - React Native CLI
- **Navigation** - React Navigation v6
- **UI Components** - Lucide React Native icons
- **State Management** - React hooks and context
- **Styling** - React Native StyleSheet

### Emergency Integration
- **TCI Emergency Services** - Direct 911 API integration
- **Location Services** - Real-time GPS tracking
- **Communication** - SMS, voice, and data transmission
- **Data Privacy** - TCI data protection compliance

## 🔧 Development

### Code Style
- **TypeScript** - Type-safe development
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Jest** - Unit testing

### Git Workflow
- **Feature Branches** - `feature/feature-name`
- **Bug Fixes** - `fix/bug-description`
- **Releases** - `release/version-number`

### Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- ComponentName.test.tsx
```

## 📚 Documentation

### Technical Documentation
- [Hardware Specification](./docs/TCI_Wristband_Specification.md)
- [API Documentation](./docs/api.md)
- [Component Library](./docs/components.md)

### Business Documentation
- [Business Plan](./docs/TCI_Wristband_Business_Plan.md)
- [Market Research](./docs/TCI_Market_Research.md)
- [Financial Projections](./docs/financials.md)

### User Documentation
- [User Guide](./docs/user-guide.md)
- [Emergency Procedures](./docs/emergency-procedures.md)
- [Troubleshooting](./docs/troubleshooting.md)

## 🌍 Regulatory Compliance

### TCI Requirements
- **TCI Telecommunications Commission** - Device certification
- **Emergency Services** - API integration approval
- **Safety Standards** - Maritime safety compliance
- **Data Privacy** - TCI data protection laws

### International Standards
- **CE Marking** - European safety standards
- **FCC Approval** - US communications standards
- **ISO Standards** - Quality management systems
- **Maritime Safety** - SOLAS compliance

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

### Code Review Process
- All changes require code review
- Tests must pass before merging
- Documentation updates required
- Security review for sensitive changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Emergency Support
- **24/7 Emergency Line** - Direct connection to TCI emergency services
- **Technical Support** - App and device troubleshooting
- **Customer Success** - Onboarding and training

### Contact Information
- **Email** - support@tcisafety.com
- **Phone** - +1-649-946-9999
- **Website** - https://tcisafety.com

## 🚀 Roadmap

### Phase 1: Foundation (Months 1-6)
- [x] React Native CLI setup
- [x] Basic navigation structure
- [x] Wristband screen implementation
- [ ] Hardware integration planning
- [ ] Emergency services API design

### Phase 2: Development (Months 7-12)
- [ ] GPS and location services
- [ ] Bluetooth device pairing
- [ ] Emergency alert system
- [ ] Environmental data integration
- [ ] User management system

### Phase 3: Integration (Months 13-18)
- [ ] TCI emergency services integration
- [ ] Weather API integration
- [ ] Real-time monitoring
- [ ] Security implementation
- [ ] Performance optimization

### Phase 4: Launch (Months 19-24)
- [ ] Regulatory approval
- [ ] Beta testing with resorts
- [ ] Production deployment
- [ ] Marketing campaign
- [ ] Customer support system

## 🏆 Why React Native CLI?

### Advantages for This Project
- **Direct Hardware Access** - Full control over GPS, Bluetooth, cellular
- **Performance Critical** - Emergency response requires sub-second times
- **Security Requirements** - Custom encryption and data handling
- **Regulatory Compliance** - TCI-specific requirements
- **Battery Optimization** - Critical for 7-14 day battery life

### Technical Benefits
- **Smaller Bundle Size** - Only include necessary components
- **Better Performance** - Direct native compilation
- **Custom Native Modules** - Hardware-specific integrations
- **Platform Optimization** - iOS/Android specific optimizations
- **Offline Capabilities** - Full control over offline behavior

---

**Built with ❤️ for the safety of visitors and residents of the beautiful Turks and Caicos Islands**

*React Native CLI provides the performance and control needed for life-saving technology.*
