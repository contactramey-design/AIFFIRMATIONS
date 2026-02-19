# 🚀 Next Steps - Complete Your Setup

## ✅ You Have Your Supabase Credentials!

Now let's complete the setup:

## Step 1: Set Up Database (2 minutes)

1. **Go to Supabase Dashboard** → **SQL Editor** (left sidebar)
2. **Click "New query"**
3. **Open the file:** `supabase/setup.sql` in this project
4. **Copy ALL the SQL code** from that file
5. **Paste it into the SQL Editor**
6. **Click "Run"** (or press Cmd/Ctrl + Enter)
7. You should see: ✅ **"Success. No rows returned"**

This creates:
- ✅ `affirmations` table
- ✅ Row Level Security (RLS) policies
- ✅ Indexes for performance

## Step 2: Enable Authentication (1 minute)

1. **Go to:** Authentication → **Providers** (left sidebar)
2. **For testing (easiest):**
   - Make sure **"Email"** is toggled ON (usually is by default)
   - Users can sign up with email/password

3. **For production (optional now):**
   - Toggle **"Google"** ON → Configure (needs OAuth setup)
   - Toggle **"Apple"** ON → Configure (needs Apple Dev account)

## Step 3: Deploy Edge Function (5 minutes)

Run these commands in your terminal:

```bash
# 1. Login to Supabase CLI
supabase login

# 2. Link your project (get Reference ID from: Settings → General)
#    Your Project ID is: ypeskhbgeyghqrsnbfmk
supabase link --project-ref ypeskhbgeyghqrsnbfmk

# 3. Deploy the function
supabase functions deploy generate-affirmation

# 4. Get OpenAI API key from: https://platform.openai.com/api-keys
#    (Create account if needed, then create a new secret key)

# 5. Set the OpenAI key as a secret
supabase secrets set OPENAI_API_KEY=sk-your-actual-key-here
```

## Step 4: Verify Setup

```bash
# Check if everything is configured
npm run check-setup

# Start the app!
npm start
```

## Step 5: Test the App! 🎉

1. **Press `i`** for iOS simulator or **`a`** for Android
2. **Or scan QR code** with Expo Go app on your phone
3. You should see the **onboarding screen**
4. **Sign in** with email (or Google/Apple if configured)
5. **Generate your first affirmation!**

---

## 🐛 Troubleshooting

**"Function not found" error:**
- Make sure you ran: `supabase functions deploy generate-affirmation`

**"Invalid API key" error:**
- Check your `.env` file has correct Supabase URL and key
- Make sure no extra spaces or quotes

**"OpenAI error":**
- Verify secret is set: `supabase secrets list`
- Make sure OpenAI API key is valid and has credits

**Auth not working:**
- Check providers are enabled in Supabase dashboard
- For testing, email/password is easiest

---

## 📋 Quick Checklist

- [ ] SQL setup run in Supabase SQL Editor
- [ ] Authentication provider enabled (Email at minimum)
- [ ] Supabase CLI installed and logged in
- [ ] Project linked (`supabase link`)
- [ ] Edge Function deployed
- [ ] OpenAI API key secret set
- [ ] App started (`npm start`)

**You're almost there!** 🚀
