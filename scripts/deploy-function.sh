#!/bin/bash

# Deploy Supabase Edge Function
# Usage: ./scripts/deploy-function.sh

set -e

cd "$(dirname "$0")/.."

SUPABASE_CMD="./bin/supabase"

if [ ! -f "$SUPABASE_CMD" ]; then
    echo "❌ Supabase CLI not found. Run ./deploy.sh first"
    exit 1
fi

echo "🚀 Deploying Edge Function: generate-affirmation"
echo ""

# Check if logged in
if ! $SUPABASE_CMD projects list &>/dev/null; then
    echo "⚠️  Not logged in. Please run:"
    echo "   $SUPABASE_CMD login"
    exit 1
fi

# Check if linked
if [ ! -f ".supabase/config.toml" ]; then
    echo "⚠️  Project not linked. Please run:"
    echo "   $SUPABASE_CMD link --project-ref ypeskhbgeyghqrsnbfmk"
    exit 1
fi

# Deploy the function
echo "📦 Deploying..."
$SUPABASE_CMD functions deploy generate-affirmation

echo ""
echo "✅ Function deployed successfully!"
echo ""
echo "Next: Set OpenAI API key:"
echo "   $SUPABASE_CMD secrets set OPENAI_API_KEY=sk-your-key-here"
