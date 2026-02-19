# 🌐 Localhost Preview Guide

## 🚀 Server Status

The Expo development server is starting! Here's how to access your app:

## 📱 Access Options

### Option 1: Web Browser (Easiest)
Once the server starts, you can access the web version at:
- **http://localhost:8081** (Metro bundler)
- The web preview should automatically open, or you can press `w` in the terminal

### Option 2: Expo Dev Tools
The Expo dev server provides an interactive menu:
- Press `w` - Open in web browser
- Press `i` - Open in iOS simulator (requires Xcode)
- Press `a` - Open in Android emulator (requires Android Studio)
- Press `r` - Reload the app
- Press `m` - Toggle menu

### Option 3: Expo Go App (Mobile)
1. Install **Expo Go** app on your phone:
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

2. Scan the QR code shown in the terminal
3. The app will load on your device

## 🔍 Check Server Status

To see if the server is running:
```bash
# Check if Metro bundler is running
lsof -ti:8081

# Or check the process
ps aux | grep expo
```

## ⚠️ Important Notes

### Before the app works fully, you need:

1. **Configure `.env` file** with your Supabase credentials:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

2. **Set up Supabase database** (run SQL from `supabase/setup.sql`)

3. **Deploy edge function** (for AI affirmations to work)

### The app will still load in preview mode, but:
- Authentication won't work without Supabase credentials
- AI generation won't work without the edge function deployed
- You'll see the UI and can navigate, but features need backend setup

## 🛠️ Troubleshooting

### Server won't start?
```bash
# Kill any existing processes
pkill -f "expo start" || pkill -f "metro"

# Clear cache and restart
npm start -- --clear
```

### Port already in use?
```bash
# Find what's using port 8081
lsof -ti:8081

# Kill it if needed
kill -9 $(lsof -ti:8081)
```

### Web preview not working?
- Make sure you have `expo-web` installed (should be included)
- Try: `npm run web` directly
- Check browser console for errors

## 📊 Current Status

The development server should be running in the background. Check your terminal for:
- QR code for Expo Go
- Interactive menu with options
- Any error messages

If you see errors about missing `.env` variables, that's expected - the app will still load but features won't work until you complete the setup steps in `DEPLOYMENT_READY.md`.

---

**Quick Access**: Open http://localhost:8081 in your browser once the server is ready!
