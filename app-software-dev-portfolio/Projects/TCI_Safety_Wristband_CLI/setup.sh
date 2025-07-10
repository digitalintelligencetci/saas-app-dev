#!/bin/bash

echo "🏝️  TCI Safety Wristband - React Native CLI Setup"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please install Node.js v18 or higher."
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if React Native CLI is installed
if ! command -v npx @react-native-community/cli &> /dev/null; then
    echo "📦 Installing React Native CLI..."
    npm install -g @react-native-community/cli
fi

echo "✅ React Native CLI ready"

# Install dependencies
echo "📦 Installing project dependencies..."
npm install

# iOS setup (macOS only)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Setting up iOS dependencies..."
    cd ios
    pod install
    cd ..
    echo "✅ iOS setup complete"
else
    echo "ℹ️  iOS setup skipped (macOS required)"
fi

# Check if Android Studio is installed (basic check)
if command -v adb &> /dev/null; then
    echo "✅ Android development environment detected"
else
    echo "⚠️  Android Studio not detected. Install for Android development."
fi

echo ""
echo "🚀 Setup complete! To run the app:"
echo ""
echo "  # Start Metro bundler"
echo "  npm start"
echo ""
echo "  # Run on iOS Simulator"
echo "  npm run ios"
echo ""
echo "  # Run on Android Emulator"
echo "  npm run android"
echo ""
echo "📚 Check README.md for detailed instructions"
echo ""
echo "🏝️  Welcome to TCI Safety Wristband development!" 