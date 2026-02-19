# 🔧 Web Server Troubleshooting Guide

## The Problem
The web server (webpack) isn't running, which is why you get connection errors in the browser.

## ✅ Solution: Start the Web Server

### Step 1: Open Terminal
Open a terminal window in your project directory.

### Step 2: Start the Web Server
Run this command:

```bash
npm run web
```

### Step 3: Watch for Errors
**Important**: Watch the terminal output! You should see:

1. **"Starting Metro Bundler"** - This is good
2. **"Starting Webpack"** - This is good
3. **"Compiling..."** - Wait for this
4. **"✓ Compiled successfully"** - Success!
5. **"Web is waiting on http://localhost:19006"** - Ready!

### Step 4: Wait for Compilation
- **First time**: Wait 1-2 minutes
- **Subsequent times**: Wait 30-60 seconds

### Step 5: Open Browser
Once you see "Web is waiting on http://localhost:19006", open:
```
http://localhost:19006
```

## 🐛 Common Errors & Fixes

### Error: "Cannot find module 'babel-preset-expo'"
```bash
npm install --save-dev babel-preset-expo@~11.0.0
```

### Error: "Module not found" or compilation errors
```bash
# Clear cache and reinstall
rm -rf .expo node_modules/.cache
npm install --legacy-peer-deps
npm run web
```

### Error: "Port 19006 already in use"
```bash
# Kill the process using the port
lsof -ti:19006 | xargs kill -9
npm run web
```

### Error: Babel/TypeScript compilation errors
Check the terminal output for specific errors. Common fixes:
- Missing dependencies: `npm install --legacy-peer-deps`
- TypeScript errors: Check your code files
- Configuration errors: Check `babel.config.js` and `app.json`

### Server starts but browser shows blank page
1. Wait longer (compilation takes time)
2. Check browser console (Cmd+Option+I) for JavaScript errors
3. Try hard refresh (Cmd+Shift+R)
4. Check terminal for compilation errors

## 📋 Step-by-Step Debug Process

1. **Kill all processes:**
   ```bash
   pkill -f expo
   pkill -f metro
   ```

2. **Clear cache:**
   ```bash
   rm -rf .expo
   rm -rf node_modules/.cache
   ```

3. **Start fresh:**
   ```bash
   npm run web
   ```

4. **Watch the terminal** - Look for:
   - Any red error messages
   - Compilation progress
   - "Web is waiting" message

5. **If errors appear**, copy them and check what they say

## 🎯 Quick Test

Run this to check if everything is set up correctly:

```bash
# Check if dependencies are installed
npm list expo react-native babel-preset-expo

# Should show:
# expo@51.0.x
# react-native@0.74.0
# babel-preset-expo@11.0.x
```

## ⚠️ Important

- **Keep the terminal window open** - The server needs to keep running
- **Don't close the terminal** - Closing it stops the server
- **Watch for errors** - The terminal will show what's wrong

---

**Next Step**: Run `npm run web` in your terminal and **watch the output** for any error messages!
