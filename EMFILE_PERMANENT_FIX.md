# 🔧 Permanent Fix for EMFILE Error

## The Problem
Metro is trying to watch too many files, hitting macOS file limit.

## ✅ Permanent Fix

### Option 1: Install Watchman (Recommended)
Watchman is Facebook's file watching service - much more efficient:

```bash
brew install watchman
```

Then restart your terminal and run:
```bash
./START_WEB_FINAL.sh
```

### Option 2: Increase System Limits (If Watchman Doesn't Work)

Edit `/etc/sysctl.conf` (requires sudo):

```bash
sudo nano /etc/sysctl.conf
```

Add these lines:
```
kern.maxfiles=65536
kern.maxfilesperproc=32768
```

Then restart your Mac.

### Option 3: Use Polling Instead of Watching (Slower but Works)

Set this environment variable:
```bash
export EXPO_USE_FAST_REFRESH=false
export EXPO_NO_METRO_LAZY=false
npm run web
```

## 🎯 Quick Fix Right Now

1. **Install Watchman:**
   ```bash
   brew install watchman
   ```

2. **Restart Terminal** (close and reopen)

3. **Run:**
   ```bash
   ./START_WEB_FINAL.sh
   ```

## ⚠️ If Still Getting EMFILE

The Metro config has been updated to watch fewer files. If it still happens:

1. Close ALL terminal windows
2. Open a NEW terminal
3. Run: `./START_WEB_FINAL.sh`

---

**Best solution**: Install Watchman with `brew install watchman` then restart terminal!
