# 🔧 Quick Fix: Port 8081 Already in Use

## ✅ Best Solution: Use Existing Server

You already have Expo running! Just:

1. **Go to the terminal window** where Expo is running (the one showing the QR code)
2. **Press `w`** (lowercase) in that terminal
3. This will start the web version using the existing server
4. Browser will open at http://localhost:19006

## Alternative: Kill and Restart

If you want to start fresh:

1. **Answer `n`** to the prompt (don't use port 8082)
2. **Kill the existing process:**
   ```bash
   kill 2266
   ```
3. **Then start web version:**
   ```bash
   npm run web
   ```

## Why This Happened

- Port 8081 = Metro bundler (already running)
- When you run `npm run web`, it tries to start Metro again
- Since 8081 is taken, it asks if you want 8082

**But you don't need to!** The existing server can serve web too - just press `w`!

---

**Quickest fix**: Go to your Expo terminal and press `w`! 🚀
