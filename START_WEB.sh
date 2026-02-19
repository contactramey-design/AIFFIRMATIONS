#!/bin/bash

# Simple Web Server Starter
# This ignores the QR code and just starts the web version

cd "$(dirname "$0")"

echo "🚀 Starting Web Server..."
echo ""
echo "⏳ This will take 1-2 minutes..."
echo ""
echo "IGNORE THE QR CODE - It's only for mobile phones!"
echo ""
echo "Wait for: 'Web is waiting on http://localhost:19006'"
echo "Then open that URL in your browser"
echo ""
echo "Press Ctrl+C to stop"
echo "=========================================="
echo ""

# Increase file limit
ulimit -n 4096

# Start web server
npm run web
