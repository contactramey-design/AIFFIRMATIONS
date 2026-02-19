# 🚀 START HERE - LumiAffirm Setup

## ✅ What's Already Done

- ✅ All project files created
- ✅ Dependencies installed (`node_modules/` ready)
- ✅ `.env` file created (needs your credentials)
- ✅ SQL setup file ready (`supabase/setup.sql`)
- ✅ Edge Function ready (`supabase/functions/generate-affirmation/`)
- ✅ Setup scripts created

## 🎯 Your Next Steps (10-15 minutes)

### 1. Fill in Supabase Credentials

1. **Create Supabase project:**
   - Go to https://supabase.com → Sign in → "New Project"
   - Name it `LumiAffirm`, choose region, create password
   - Wait 2-3 minutes for initialization

2. **Get your credentials:**
   - In Supabase Dashboard → **Settings** → **API**
   - Copy **Project URL** and **anon public key**

3. **Update `.env` file:**
   ```bash
   # Open .env and paste:
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 2. Set Up Database

1. In Supabase → **SQL Editor** → **New query**
2. Open `supabase/setup.sql` and copy ALL contents
3. Paste into SQL Editor and click **"Run"**
4. Should see: ✅ "Success. No rows returned"

### 3. Enable Authentication

- Go to **Authentication** → **Providers**
- For testing: Enable **"Email"** (usually on by default)
- For production: Enable **Google** and/or **Apple** (requires OAuth setup)

### 4. Deploy Edge Function

```bash
# Install Supabase CLI (if needed)
npm install -g supabase

# Login
supabase login

# Link project (get Reference ID from: Settings → General)
supabase link --project-ref YOUR_PROJECT_REF

# Deploy function
supabase functions deploy generate-affirmation

# Get OpenAI key from https://platform.openai.com/api-keys
# Set secret
supabase secrets set OPENAI_API_KEY=sk-your-key-here
```

### 5. Verify & Run!

```bash
# Check setup status
npm run check-setup

# Start the app
npm start
```

---

## 📚 Documentation

- **`QUICK_SETUP.md`** - Detailed step-by-step guide
- **`SETUP.md`** - Original setup documentation
- **`SETUP_COMPLETE.md`** - Status checklist

---

## 🆘 Quick Help

**Check setup status:**
```bash
npm run check-setup
```

**Recreate .env file:**
```bash
./scripts/create-env.sh
```

**Run setup script:**
```bash
npm run setup
```

---

## 🎉 Once Complete

You'll be able to:
- ✅ Run the app with `npm start`
- ✅ See onboarding screen
- ✅ Sign in with email/Google/Apple
- ✅ Generate AI affirmations
- ✅ Save to library
- ✅ Track free tier usage

**Let's get this running!** 🚀
