# ⚡ Quick Deployment Guide

## ✅ What's Already Done

1. ✅ **npm dependencies installed** - All packages ready
2. ✅ **Supabase CLI installed** - Available at `./bin/supabase`
3. ✅ **Environment file exists** - `.env` is ready (verify it has credentials)
4. ✅ **Edge function code ready** - Ready to deploy

## 🚀 Quick Deploy Commands

Run these commands in order:

```bash
# 1. Login to Supabase (opens browser)
./bin/supabase login

# 2. Link your project
./bin/supabase link --project-ref ypeskhbgeyghqrsnbfmk

# 3. Deploy the edge function
./bin/supabase functions deploy generate-affirmation

# 4. Set OpenAI API key (replace with your actual key)
./bin/supabase secrets set OPENAI_API_KEY=sk-your-key-here

# 5. Verify everything
./bin/supabase secrets list

# 6. Start the app!
npm start
```

## 📊 Database Setup (One-time)

If you haven't set up the database yet:

1. Go to: https://supabase.com/dashboard
2. Open **SQL Editor**
3. Copy contents of `supabase/setup.sql`
4. Paste and run

## 🔑 Get Your Keys

- **Supabase URL & Key**: https://supabase.com/dashboard → Settings → API
- **OpenAI Key**: https://platform.openai.com/api-keys

## ✅ Verify Setup

Run the deployment checker:
```bash
./deploy.sh
```

## 🎉 You're Ready!

Once you complete the 6 commands above, your app is ready to run!

For detailed instructions, see: `DEPLOYMENT_READY.md`
