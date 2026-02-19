#!/bin/bash

# FINAL FIX - Start Web Server with EMFILE Fix
# This sets the file limit BEFORE starting and reduces file watching

cd "$(dirname "$0")"

echo "🔧 Setting file limit..."
# Set file limit to 8192 (higher than default)
ulimit -n 8192
echo "✅ File limit: $(ulimit -n)"
echo ""

echo "🧹 Cleaning up..."
pkill -f "expo start" 2>/dev/null
pkill -f metro 2>/dev/null
pkill -f webpack 2>/dev/null
sleep 2
echo "✅ Cleaned"
echo ""

echo "🗑️  Clearing cache..."
rm -rf .expo
rm -rf node_modules/.cache
echo "✅ Cache cleared"
echo ""

echo "🚀 Starting Web Server..."
echo ""
echo "⏳ This will take 1-2 minutes..."
echo ""
echo "IGNORE: 'Web is waiting on http://localhost:8081' (that's Metro)"
echo "WAIT FOR: 'Web is waiting on http://localhost:19006' (this is webpack)"
echo ""
echo "Press Ctrl+C to stop"
echo "=========================================="
echo ""

# Set environment variable to reduce file watching
export EXPO_NO_DOTENV=1

# Start web server
npm run web
