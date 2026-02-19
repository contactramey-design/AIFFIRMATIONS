# 🚀 Quick Setup Guide - LumiAffirm

## Automated Setup (Run this first!)

```bash
# Make setup script executable and run it
chmod +x scripts/setup.sh
./scripts/setup.sh
```

OR manually:

```bash
# 1. Copy .env.example to .env
cp .env.example .env

# 2. Install dependencies
npm install

# 3. Install Supabase CLI globally (if not already installed)
npm install -g supabase
```

---

## Step-by-Step Manual Setup

### 1️⃣ Create Supabase Project

1. Go to **https://supabase.com** and sign in
2. Click **"New Project"**
3. Fill in:
   - **Name**: `LumiAffirm`
   - **Database Password**: (create a strong password - save it!)
   - **Region**: Choose closest to you
4. Click **"Create new project"**
5. Wait 2-3 minutes for initialization

### 2️⃣ Get Supabase Credentials

1. In Supabase dashboard → **Settings** (⚙️) → **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

3. **Update your `.env` file:**
   ```bash
   # Open .env and paste:
   EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 3️⃣ Create Database Table

1. In Supabase dashboard → **SQL Editor** (left sidebar)
2. Click **"New query"**
3. **Copy and paste** the entire contents of `supabase/setup.sql`
4. Click **"Run"** (or press `Cmd/Ctrl + Enter`)
5. You should see: ✅ **"Success. No rows returned"**

### 4️⃣ Enable Authentication

1. Go to **Authentication** → **Providers**
2. **For Google:**
   - Toggle **"Google"** ON
   - Click **"Configure"**
   - You'll need Google OAuth credentials (can skip for now if testing)
3. **For Apple:**
   - Toggle **"Apple"** ON
   - Requires Apple Developer account for production
   - Can skip for initial testing

**OR use Email/Password for testing:**
- Toggle **"Email"** ON (usually enabled by default)
- Users can sign up with email

### 5️⃣ Deploy Supabase Edge Function

```bash
# 1. Login to Supabase CLI
supabase login

# 2. Get your project reference ID
#    Go to: Supabase Dashboard → Settings → General
#    Copy the "Reference ID" (looks like: abcdefghijklmnop)

# 3. Link your project
supabase link --project-ref YOUR_PROJECT_REF

# 4. Deploy the function
supabase functions deploy generate-affirmation

# 5. Set OpenAI API key
#    First, get your key from: https://platform.openai.com/api-keys
supabase secrets set OPENAI_API_KEY=sk-your-actual-key-here
```

### 6️⃣ Get OpenAI API Key

1. Go to **https://platform.openai.com/api-keys**
2. Sign in or create account
3. Click **"Create new secret key"**
4. Copy the key (starts with `sk-`)
5. Use it in step 5 above

### 7️⃣ Verify Setup

```bash
# Run the setup checker
node scripts/check-setup.js
```

### 8️⃣ Start the App!

```bash
npm start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your phone

---

## ✅ Setup Checklist

- [ ] Created Supabase project
- [ ] Filled in `.env` with Supabase credentials
- [ ] Ran SQL setup script in Supabase SQL Editor
- [ ] Enabled authentication providers
- [ ] Installed dependencies (`npm install`)
- [ ] Installed Supabase CLI (`npm install -g supabase`)
- [ ] Logged in to Supabase CLI (`supabase login`)
- [ ] Linked project (`supabase link`)
- [ ] Deployed Edge Function (`supabase functions deploy`)
- [ ] Set OpenAI API key secret
- [ ] Verified setup (`node scripts/check-setup.js`)
- [ ] Started app (`npm start`)

---

## 🐛 Troubleshooting

**"Function not found" error:**
- Make sure you deployed: `supabase functions deploy generate-affirmation`

**"Invalid API key" error:**
- Check `.env` file has correct Supabase URL and anon key
- Make sure there are no extra spaces or quotes

**"OpenAI error" in function:**
- Verify secret is set: `supabase secrets list`
- Make sure OpenAI API key is valid and has credits

**Auth not working:**
- Check providers are enabled in Supabase dashboard
- For local testing, email/password is easiest

**Can't install dependencies:**
- Try: `npm install --legacy-peer-deps`
- Or: `yarn install` (if you have yarn)

---

## 📞 Need Help?

Check the main `SETUP.md` for more detailed instructions.
