#!/bin/bash

# Start Expo Web Server
# This will start webpack and open the web version

cd "$(dirname "$0")"

echo "🌐 Starting Expo Web Server..."
echo ""

# Check if Metro is running
if ! lsof -ti:8081 > /dev/null 2>&1; then
    echo "⚠️  Metro bundler not running. Starting it first..."
    echo "   (This will start both Metro and Webpack)"
    echo ""
fi

# Start web version
echo "Starting web server..."
echo "This will:"
echo "  1. Start webpack on port 19006"
echo "  2. Open http://localhost:19006 in your browser"
echo "  3. Take 30-60 seconds to compile"
echo ""
echo "Press Ctrl+C to stop"
echo "----------------------------------------"
echo ""

npx expo start --web
