# Deploy AI Affirmations (LumiAffirm) to Vercel

## Build (verified working)

- **Build command:** `npx expo export --platform web`
- **Output directory:** `dist`

The project is configured in `vercel.json`. No need to set these in the Vercel UI unless you override.

## Deploy

### Option A: Vercel CLI

1. Install the CLI (one time): `npm i -g vercel`
2. From the project root:
   ```bash
   cd /Users/sydneyrenay/AI.firmations
   vercel
   ```
3. When prompted:
   - Link to existing project? **No** (first time) or **Yes** if you already created “AI Affirmations”
   - Project name: **ai-affirmations** (or **AI Affirmations**)
   - Leave defaults; Vercel will use `vercel.json` (build command and output directory).

4. Add environment variables (required for Supabase):
   ```bash
   vercel env add EXPO_PUBLIC_SUPABASE_URL
   vercel env add EXPO_PUBLIC_SUPABASE_ANON_KEY
   ```
   Or in Vercel Dashboard: Project → Settings → Environment Variables.

5. Redeploy after adding env vars:
   ```bash
   vercel --prod
   ```

### Option B: GitHub + Vercel Dashboard

1. Push the repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → import the repo.
3. Vercel will detect `vercel.json` and use:
   - **Build Command:** `npx expo export --platform web`
   - **Output Directory:** `dist`
4. Add environment variables:
   - `EXPO_PUBLIC_SUPABASE_URL` = your Supabase project URL  
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key  
   (Production and Preview if you want them on all deployments.)
5. Deploy.

## Environment variables

| Name | Description |
|------|-------------|
| `EXPO_PUBLIC_SUPABASE_URL` | Supabase project URL (e.g. `https://ypeskhbgeyghqrsnbfmk.supabase.co`) |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |

These must be set in Vercel (CLI or Dashboard) so the deployed app can talk to Supabase auth and the Edge Function.

## After deployment

- App URL: `https://<your-project>.vercel.app`
- You can add a custom domain in Vercel (Project → Settings → Domains).

## Local web export (optional)

To test the same build locally:

```bash
npm run build:web
npx serve dist
```

Then open the URL shown (e.g. `http://localhost:3000`).
