# 🌐 Web Preview Fix Guide

## ✅ Server Status
Your server IS running on port 8081! ✅

## 🎯 How to Access Web Preview

### Method 1: Use Terminal Menu (Recommended)
1. Look at your terminal where `npm start` is running
2. You should see an interactive menu
3. **Press `w`** (lowercase) to open web version
4. This will automatically open http://localhost:19006 in your browser

### Method 2: Direct URL Access
The Metro bundler at http://localhost:8081 is for the API, not the web app.

For web preview, you need to:
1. **Press `w` in the terminal** to start the web bundler
2. Or run in a new terminal: `npm run web`
3. This will start webpack and open http://localhost:19006

### Method 3: Start Web Directly
If the regular server is running, open a NEW terminal and run:
```bash
npm run web
```

This will:
- Start the web bundler
- Open http://localhost:19006 automatically
- Show the web version of your app

## ⚠️ Common Issues

### "Can't connect to localhost:8081"
- Port 8081 is the Metro bundler (for mobile)
- For web, you need port 19006 (webpack)
- Press `w` in terminal or run `npm run web`

### "Blank page" or "Loading..."
- Wait 30-60 seconds for webpack to compile
- Check browser console (Cmd+Option+I) for errors
- Make sure you're on http://localhost:19006 (not 8081)

### "Module not found" errors
You might need to install web dependencies:
```bash
npx expo install react-dom react-native-web
```

## 🔍 Check What's Running

```bash
# Check Metro bundler (mobile)
lsof -ti:8081

# Check Webpack (web)
lsof -ti:19006
```

## 📱 Alternative: Use Expo Go (Mobile)

If web preview is having issues:
1. Install **Expo Go** app on your phone
2. Make sure your phone and computer are on the same WiFi
3. Scan the QR code shown in your terminal
4. App will load on your device

---

**Quick Fix**: In your terminal where `npm start` is running, just **press `w`**!
