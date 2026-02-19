# 🎯 Complete Setup Guide - You Have Your Credentials!

## ✅ What You've Done
- ✅ Created Supabase project
- ✅ Got your credentials (URL + Publishable Key)
- ✅ Filled in `.env` file

## 🚀 Next Steps (15 minutes)

### Step 1: Set Up Database (2 min) ⭐ DO THIS FIRST

1. **Open Supabase Dashboard** → Click **"SQL Editor"** (left sidebar)
2. **Click "New query"** button
3. **Copy the SQL below** (or from `supabase/setup.sql` file):

```sql
-- Create affirmations table
create table if not exists affirmations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  prompt text not null,
  text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table affirmations enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Users can view own affirmations" on affirmations;
drop policy if exists "Users can insert own affirmations" on affirmations;
drop policy if exists "Users can delete own affirmations" on affirmations;

-- Policy: Users can only view their own affirmations
create policy "Users can view own affirmations"
  on affirmations for select
  using (auth.uid() = user_id);

-- Policy: Users can insert their own affirmations
create policy "Users can insert own affirmations"
  on affirmations for insert
  with check (auth.uid() = user_id);

-- Policy: Users can delete their own affirmations
create policy "Users can delete own affirmations"
  on affirmations for delete
  using (auth.uid() = user_id);

-- Create index for faster queries
create index if not exists affirmations_user_id_idx on affirmations(user_id);
create index if not exists affirmations_created_at_idx on affirmations(created_at desc);
```

4. **Paste into SQL Editor**
5. **Click "Run"** (or Cmd/Ctrl + Enter)
6. ✅ Should see: **"Success. No rows returned"**

---

### Step 2: Enable Authentication (1 min)

1. **Go to:** Authentication → **Providers** (left sidebar)
2. **For testing:** Make sure **"Email"** is ON ✅
3. **For production (later):** Enable Google/Apple if needed

---

### Step 3: Install Supabase CLI (2 min)

**Option A: Using Homebrew (macOS - Recommended)**
```bash
brew install supabase/tap/supabase
```

**Option B: Manual Install**
- Visit: https://github.com/supabase/cli#install-the-cli
- Follow instructions for your OS

**Option C: Use the script**
```bash
./scripts/install-supabase-cli.sh
```

---

### Step 4: Deploy Edge Function (5 min)

```bash
# 1. Login (opens browser)
supabase login

# 2. Link your project
#    Your Project ID: ypeskhbgeyghqrsnbfmk
supabase link --project-ref ypeskhbgeyghqrsnbfmk

# 3. Deploy the function
supabase functions deploy generate-affirmation

# 4. Get OpenAI API key
#    Go to: https://platform.openai.com/api-keys
#    Create account → Create new secret key → Copy it

# 5. Set OpenAI key as secret
supabase secrets set OPENAI_API_KEY=sk-your-actual-key-here

# 6. Verify it's set
supabase secrets list
```

---

### Step 5: Test the App! 🎉

```bash
# Start the app
npm start

# Then:
# - Press 'i' for iOS simulator
# - Press 'a' for Android emulator  
# - Or scan QR code with Expo Go app
```

**What to test:**
1. ✅ See onboarding screen
2. ✅ Sign in with email
3. ✅ Generate an affirmation
4. ✅ Save to library
5. ✅ View library

---

## 🐛 Troubleshooting

**"Function not found":**
```bash
supabase functions deploy generate-affirmation
```

**"Invalid API key":**
- Check `.env` file - no extra spaces/quotes
- Make sure URL is: `https://ypeskhbgeyghqrsnbfmk.supabase.co`

**"OpenAI error":**
- Check secret: `supabase secrets list`
- Make sure OpenAI key is valid and has credits

**Can't install Supabase CLI:**
- Use Homebrew: `brew install supabase/tap/supabase`
- Or install manually from GitHub

---

## 📋 Final Checklist

- [ ] SQL setup run in Supabase SQL Editor ✅
- [ ] Email auth enabled in Supabase
- [ ] Supabase CLI installed
- [ ] Logged in: `supabase login`
- [ ] Project linked: `supabase link`
- [ ] Function deployed: `supabase functions deploy`
- [ ] OpenAI secret set: `supabase secrets set`
- [ ] App started: `npm start`

**You're almost done!** 🚀
