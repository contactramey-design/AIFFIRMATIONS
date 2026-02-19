#!/bin/bash

# Start Web Server WITHOUT File Watching (Fixes EMFILE)
# Uses polling instead of file watching

cd "$(dirname "$0")"

echo "🔧 Setting file limit..."
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

echo "🚀 Starting Web Server (Polling Mode - No File Watching)..."
echo ""
echo "⏳ This will take 1-2 minutes..."
echo ""
echo "IGNORE: 'Web is waiting on http://localhost:8081' (that's Metro)"
echo "WAIT FOR: 'Web is waiting on http://localhost:19006' (this is webpack)"
echo ""
echo "Press Ctrl+C to stop"
echo "=========================================="
echo ""

# Disable file watching, use polling instead
export EXPO_NO_DOTENV=1
export CHOKIDAR_USEPOLLING=true
export CHOKIDAR_INTERVAL=1000

# Start web server
npm run web
