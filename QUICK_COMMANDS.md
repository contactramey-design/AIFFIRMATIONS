# ⚡ Quick Command Reference

## Setup Commands (Run Once)

```bash
# Install Supabase CLI (macOS)
brew install supabase/tap/supabase

# Login to Supabase
supabase login

# Link your project (Project ID: ypeskhbgeyghqrsnbfmk)
supabase link --project-ref ypeskhbgeyghqrsnbfmk

# Deploy Edge Function
supabase functions deploy generate-affirmation

# Set OpenAI API key
supabase secrets set OPENAI_API_KEY=sk-your-key-here

# Verify secrets
supabase secrets list
```

## Daily Development

```bash
# Start the app
npm start

# Check setup status
npm run check-setup

# View logs
npm start -- --clear
```

## Troubleshooting

```bash
# Re-deploy function
supabase functions deploy generate-affirmation

# Check function logs
supabase functions logs generate-affirmation

# List all secrets
supabase secrets list

# Unlink project (if needed)
supabase unlink
```

## SQL Setup (Copy & Paste in Supabase SQL Editor)

See: `supabase/setup.sql` or `COMPLETE_SETUP.md`

---

**Full guide:** See `COMPLETE_SETUP.md`
