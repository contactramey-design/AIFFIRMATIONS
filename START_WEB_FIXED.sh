#!/bin/bash

# Start Web Server with EMFILE Fix
# This script fixes the "too many open files" error

cd "$(dirname "$0")"

echo "🔧 Fixing file limit..."
ulimit -n 4096
echo "✅ File limit set to 4096"
echo ""

echo "🚀 Starting Web Server..."
echo ""
echo "⏳ This will take 1-2 minutes..."
echo ""
echo "IGNORE THE QR CODE - It's only for mobile!"
echo ""
echo "Wait for: 'Web is waiting on http://localhost:19006'"
echo "Then open that URL in your browser"
echo ""
echo "Press Ctrl+C to stop"
echo "=========================================="
echo ""

# Kill any existing processes
pkill -f "expo start" 2>/dev/null
pkill -f metro 2>/dev/null
sleep 2

# Start web server
npm run web
