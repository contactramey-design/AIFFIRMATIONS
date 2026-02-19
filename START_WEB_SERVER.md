# 🚀 Start Web Server - Step by Step

## The Issue
The webpack server isn't running, which is why you get ERR_CONNECTION_REFUSED.

## ✅ Solution: Start the Web Server

### Method 1: Use Existing Metro Server (Easiest)

1. **Find the terminal** where `npm start` is running (showing QR code)
2. **Press `w`** in that terminal
3. **Wait 30-60 seconds** for webpack to compile
4. Browser should open automatically, or go to http://localhost:19006

### Method 2: Start Fresh Web Server

Open a **NEW terminal window** and run:

```bash
cd /Users/sydneyrenay/AI.firmations
npm run web
```

**Important**: 
- Wait 1-2 minutes for first compilation
- Watch the terminal for errors
- You should see "Web is waiting on http://localhost:19006"

### Method 3: Clean Start (If Above Don't Work)

```bash
# 1. Kill everything
pkill -f expo
pkill -f metro

# 2. Clear cache
rm -rf .expo
rm -rf node_modules/.cache

# 3. Start web
npm run web
```

## 🔍 What to Look For

When webpack starts successfully, you'll see:
```
Starting Metro Bundler
Starting Webpack
Compiling...
Compiled successfully
Web is waiting on http://localhost:19006
```

## ⚠️ Common Issues

### "Port already in use"
```bash
lsof -ti:19006
kill -9 $(lsof -ti:19006)
npm run web
```

### Compilation errors
- Check terminal for TypeScript errors
- Check for missing dependencies
- Try: `npm install`

### Still not working?
Share the terminal output - there might be compilation errors preventing webpack from starting.

---

**Right now**: Open a terminal and run `npm run web`, then wait and watch for the "Web is waiting" message!
