#!/bin/bash

# Start Expo Development Server
# This script will start the server and show output

cd "$(dirname "$0")"

echo "🚀 Starting Expo Development Server..."
echo ""

# Clear any existing processes
pkill -f "expo start" 2>/dev/null
pkill -f "metro" 2>/dev/null

# Start the server
echo "Starting server... (this may take 30-60 seconds)"
echo "Once you see 'Metro waiting on...', the server is ready!"
echo ""
echo "Then you can:"
echo "  - Open http://localhost:8081 in your browser"
echo "  - Press 'w' in this terminal to open web version"
echo "  - Scan QR code with Expo Go app"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "----------------------------------------"
echo ""

# Start with npx to use local expo
npx expo start --web
