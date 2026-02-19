#!/bin/bash

# Start Expo Web Server Properly
# This script will start the server and keep it running

cd "$(dirname "$0")"

echo "🚀 Starting Expo Web Server..."
echo ""

# Kill any existing processes
pkill -f "expo start" 2>/dev/null
pkill -f metro 2>/dev/null
sleep 2

# Increase file limit to prevent EMFILE errors
ulimit -n 4096

echo "Starting web server..."
echo "This will take 1-2 minutes for first compilation"
echo ""
echo "You should see:"
echo "  - 'Starting Metro Bundler'"
echo "  - 'Starting Webpack'"
echo "  - 'Compiling...'"
echo "  - '✓ Compiled successfully'"
echo "  - 'Web is waiting on http://localhost:19006'"
echo ""
echo "Then open http://localhost:19006 in your browser"
echo ""
echo "Press Ctrl+C to stop the server"
echo "----------------------------------------"
echo ""

# Start the web server
npm run web
