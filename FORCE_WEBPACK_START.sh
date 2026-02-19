#!/bin/bash

# Force Webpack to Start on Port 19006
# This bypasses the 'w' menu and starts webpack directly

cd "$(dirname "$0")"

echo "🔧 Setting file limit..."
ulimit -n 8192
echo "✅ File limit: $(ulimit -n)"
echo ""

echo "🧹 Killing all processes..."
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

echo "🚀 Starting Webpack DIRECTLY on port 19006..."
echo ""
echo "This will:"
echo "  1. Start Metro on 8081 (for API)"
echo "  2. Start Webpack on 19006 (YOUR WEB APP)"
echo "  3. Take 1-2 minutes to compile"
echo ""
echo "WAIT FOR: 'Web is waiting on http://localhost:19006'"
echo "Then open that URL!"
echo ""
echo "Press Ctrl+C to stop"
echo "=========================================="
echo ""

# Use polling to avoid EMFILE
export CHOKIDAR_USEPOLLING=true
export CHOKIDAR_INTERVAL=1000

# Start with --web flag which should start webpack
npx expo start --web --port 19006
