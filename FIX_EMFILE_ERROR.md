# 🔧 Fix: EMFILE Error (Too Many Open Files)

## The Problem
You're seeing: `Error: EMFILE: too many open files, watch`

This is a macOS system limit issue. The file watcher can't watch all your project files.

## ✅ Quick Fix

### Option 1: Increase File Limit (Temporary)
In your terminal, run:
```bash
ulimit -n 4096
```

Then restart the server:
```bash
npm start
```

### Option 2: Permanent Fix
Add this to your `~/.zshrc` file:
```bash
ulimit -n 4096
```

Then reload:
```bash
source ~/.zshrc
```

## 🎯 Important: Use Port 8081!

I see your server is running on **port 8081**, not 19006!

**Try this URL instead:**
```
http://localhost:8081
```

## Or Press 'w' for Web Version

In your terminal where the server is running:
1. **Press `w`** (lowercase)
2. This will start webpack on port 19006
3. Wait for compilation
4. Then open http://localhost:19006

---

**Action**: Try http://localhost:8081 first, or press `w` in your terminal!
