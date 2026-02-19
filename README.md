# LumiAffirm - AI Affirmations App

A beautiful, magical mobile app for personalized AI-generated affirmations built with React Native + Expo.

## Features

- ✨ Beautiful ethereal UI with lavender-sky gradients
- 🤖 AI-powered personalized affirmations
- 📚 Save and organize your affirmations
- 💰 Free tier (5 generations) + subscription ($0.99/month)
- 🎨 Smooth animations and glowing effects

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file with:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Set up Supabase:
- Create a Supabase project
- Create an `affirmations` table:
```sql
create table affirmations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  prompt text not null,
  text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

- Create an Edge Function `generate-affirmation` (see `supabase/functions/generate-affirmation/index.ts`)

4. Run the app:
```bash
npm start
```

## Project Structure

- `app/` - Expo Router screens
- `components/` - Reusable UI components
- `lib/` - Utilities, Supabase client, storage functions
- `hooks/` - Custom React hooks
- `types/` - TypeScript type definitions

## Tech Stack

- React Native + Expo
- NativeWind (Tailwind CSS)
- React Native Reanimated 3
- Supabase (Auth + Database)
- OpenAI API (via Supabase Edge Functions)
- RevenueCat (Subscriptions)
