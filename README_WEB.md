# 🌐 How to Run on Web (Simple!)

## ✅ IGNORE THE QR CODE
The QR code in the terminal is **ONLY for mobile phones**. You don't need it for web!

## 🚀 Start Web Server

### Option 1: Use the Script (Easiest)
```bash
./START_WEB.sh
```

### Option 2: Manual
```bash
npm run web
```

## ⏳ Wait for Compilation

You'll see in the terminal:
1. "Starting Metro Bundler" ✅
2. "Starting Webpack" ✅
3. "Compiling..." ⏳ (wait 1-2 minutes)
4. "✓ Compiled successfully" ✅
5. **"Web is waiting on http://localhost:19006"** ✅

## 🌐 Open Browser

**ONLY AFTER** you see "Web is waiting on http://localhost:19006", open:
```
http://localhost:19006
```

## ⚠️ Important

- **Keep terminal open** - Server must keep running
- **Wait for compilation** - Don't open browser too early
- **Blank page?** - Open browser console (Cmd+Option+I) and check for errors

## 🐛 Troubleshooting

### Blank Page
1. Open browser console: **Cmd+Option+I**
2. Look for red errors
3. Share errors with me

### Server Won't Start
```bash
# Kill everything
pkill -f expo
pkill -f metro

# Clear cache
rm -rf .expo node_modules/.cache

# Start fresh
npm run web
```

---

**Just run**: `./START_WEB.sh` or `npm run web` and wait!
