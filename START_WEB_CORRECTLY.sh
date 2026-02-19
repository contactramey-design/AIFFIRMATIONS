#!/bin/bash

# Start Web Server CORRECTLY - Port 19006, not 8081!
# This fixes EMFILE and ensures webpack starts

cd "$(dirname "$0")"

echo "🔧 Fixing file limit..."
ulimit -n 4096
echo "✅ File limit: $(ulimit -n)"
echo ""

echo "🧹 Cleaning up..."
pkill -f "expo start" 2>/dev/null
pkill -f metro 2>/dev/null
pkill -f webpack 2>/dev/null
sleep 2
echo "✅ Cleaned"
echo ""

echo "🚀 Starting Web Server..."
echo ""
echo "⏳ This will take 1-2 minutes..."
echo ""
echo "IGNORE messages about localhost:8081 - that's just Metro"
echo "WAIT for: 'Web is waiting on http://localhost:19006'"
echo ""
echo "Press Ctrl+C to stop"
echo "=========================================="
echo ""

# Start web server - this should start webpack on 19006
npm run web
