# 🚀 Deployment Ready Checklist

## ✅ Completed Automatically

- [x] **npm dependencies installed** - All packages from `package.json` are installed
- [x] **Supabase CLI installed** - Available at `./bin/supabase` (v2.75.0)
- [x] **Environment file exists** - `.env` file is present (check it has your credentials)
- [x] **Edge function code ready** - `supabase/functions/generate-affirmation/index.ts` is ready to deploy

## 📋 Manual Steps Required

### Step 1: Login to Supabase CLI
```bash
./bin/supabase login
```
This will open your browser for authentication. Complete the login process.

### Step 2: Link Your Project
```bash
./bin/supabase link --project-ref ypeskhbgeyghqrsnbfmk
```
Replace `ypeskhbgeyghqrsnbfmk` with your actual project reference if different.

### Step 3: Set Up Database (If Not Done)
1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** (left sidebar)
4. Click **New query**
5. Copy and paste the entire contents of `supabase/setup.sql`
6. Click **Run** (or press Cmd/Ctrl + Enter)
7. You should see: ✅ **"Success. No rows returned"**

### Step 4: Enable Authentication
1. In Supabase Dashboard → **Authentication** → **Providers**
2. Make sure **Email** is enabled (for testing)
3. Enable **Google** or **Apple** if needed for production

### Step 5: Deploy Edge Function
```bash
./bin/supabase functions deploy generate-affirmation
```

### Step 6: Set OpenAI API Key
1. Get your OpenAI API key from: https://platform.openai.com/api-keys
2. Set it as a secret:
```bash
./bin/supabase secrets set OPENAI_API_KEY=sk-your-actual-key-here
```

### Step 7: Verify Setup
```bash
# Check secrets are set
./bin/supabase secrets list

# Should show OPENAI_API_KEY
```

### Step 8: Verify .env File
Make sure your `.env` file has:
```env
EXPO_PUBLIC_SUPABASE_URL=https://ypeskhbgeyghqrsnbfmk.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 🎉 Start the App

Once all steps are complete:
```bash
npm start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Or scan QR code with Expo Go app

## 🧪 Testing Checklist

- [ ] Onboarding screen appears on first launch
- [ ] Can sign in with email
- [ ] Can generate an affirmation
- [ ] Affirmation saves to library
- [ ] Can view library
- [ ] Free tier limit works (5 generations)

## 🐛 Troubleshooting

### "Function not found"
```bash
./bin/supabase functions deploy generate-affirmation
```

### "Invalid API key"
- Check `.env` file - no extra spaces/quotes
- Verify URL matches your project: `https://your-project-ref.supabase.co`

### "OpenAI error"
- Check secret: `./bin/supabase secrets list`
- Make sure OpenAI key is valid and has credits

### "Not logged in"
```bash
./bin/supabase login
```

### "Project not linked"
```bash
./bin/supabase link --project-ref your-project-ref
```

## 📚 Additional Resources

- **Full Setup Guide**: `COMPLETE_SETUP.md`
- **Quick Commands**: `QUICK_COMMANDS.md`
- **SQL Setup**: `supabase/setup.sql`

## 🎯 Quick Deploy Script

Run the deployment script anytime:
```bash
./deploy.sh
```

This will check your setup and show what's remaining.

---

**Status**: ✅ Ready for deployment! Complete the manual steps above to finish setup.
