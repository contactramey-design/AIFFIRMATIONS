# LumiAffirm Setup Guide

## Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Add your Supabase credentials:
   ```
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Set up Supabase:**

   a. Create a new Supabase project at https://supabase.com
   
   b. Create the `affirmations` table:
   ```sql
   create table affirmations (
     id uuid default gen_random_uuid() primary key,
     user_id uuid references auth.users(id) not null,
     prompt text not null,
     text text not null,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );
   
   -- Enable RLS
   alter table affirmations enable row level security;
   
   -- Policy: Users can only see their own affirmations
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
   ```

   c. Create Edge Function for AI generation:
   - Install Supabase CLI: `npm install -g supabase`
   - Login: `supabase login`
   - Link project: `supabase link --project-ref your-project-ref`
   - Create function: `supabase functions new generate-affirmation`
   - Copy the code from `supabase/functions/generate-affirmation/index.ts`
   - Set OpenAI API key: `supabase secrets set OPENAI_API_KEY=your_openai_key`
   - Deploy: `supabase functions deploy generate-affirmation`

4. **Add fonts (optional):**
   - Download Playfair Display and Inter fonts
   - Place them in `assets/fonts/` as:
     - `PlayfairDisplay-Regular.ttf`
     - `Inter-Regular.ttf`
   - If fonts are missing, the app will use system fonts

5. **Run the app:**
```bash
npm start
```

## Testing

- First launch will show onboarding
- Sign in with Apple/Google (configure in Supabase dashboard)
- Generate your first affirmation
- Test the free tier limit (5 generations)
- Test saving to library

## Next Steps

- Add RevenueCat for subscriptions
- Implement view-shot for sharing
- Add Lottie animations for sparkles
- Customize colors and gradients
