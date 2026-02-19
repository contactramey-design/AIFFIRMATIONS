# 🔧 Fix: Safari Can't Connect to Server

## Problem
Safari shows "Can't Connect to the Server" when trying to access `localhost:8081`. This means the Expo development server isn't running.

## ✅ Solution

### Option 1: Start Server Manually (Recommended)

Open a terminal in your project directory and run:

```bash
npm start
```

Or use the helper script:
```bash
./start-server.sh
```

**Wait for the server to start** (30-60 seconds). You should see:
- A QR code
- "Metro waiting on..."
- An interactive menu

Then:
- Press `w` to open in web browser
- Or open http://localhost:8081 manually

### Option 2: Start Web Version Directly

```bash
npm run web
```

This will start the server and automatically open the web version.

### Option 3: Check What's Wrong

If the server won't start, try:

```bash
# 1. Clear cache and restart
npm start -- --clear

# 2. Check for port conflicts
lsof -ti:8081
# If something is using the port, kill it:
kill -9 $(lsof -ti:8081)

# 3. Reinstall dependencies (if needed)
rm -rf node_modules
npm install
```

## 🎯 Quick Fix Steps

1. **Open Terminal** in your project folder
2. **Run**: `npm start`
3. **Wait** for the server to start (you'll see a QR code and menu)
4. **Press `w`** or open http://localhost:8081 in Safari

## ⚠️ Common Issues

### "Port 8081 already in use"
```bash
kill -9 $(lsof -ti:8081)
npm start
```

### "Command not found: expo"
The expo CLI should be in node_modules. Try:
```bash
npx expo start
```

### Server starts but browser shows error
- Wait 30-60 seconds for the server to fully initialize
- Make sure you're using http://localhost:8081 (not https)
- Try pressing `w` in the terminal instead of opening manually

### Still not working?
Check the terminal output for error messages. Common issues:
- Missing dependencies: Run `npm install`
- Node version issues: Need Node 18+ (you have v24.13.0 ✅)
- Configuration errors: Check `app.json` and `package.json`

## 📱 Alternative: Use Expo Go App

If web preview isn't working:
1. Install **Expo Go** on your phone
2. Start server: `npm start`
3. Scan the QR code shown in terminal
4. App will load on your device

---

**The server needs to be running in a terminal window for the browser to connect!**
