#!/bin/bash

# Set OpenAI API Key as Supabase Secret
# Usage: ./scripts/set-openai-key.sh [your-api-key]

set -e

cd "$(dirname "$0")/.."

SUPABASE_CMD="./bin/supabase"

if [ ! -f "$SUPABASE_CMD" ]; then
    echo "❌ Supabase CLI not found. Run ./deploy.sh first"
    exit 1
fi

if [ -z "$1" ]; then
    echo "⚠️  Please provide your OpenAI API key:"
    echo "   ./scripts/set-openai-key.sh sk-your-key-here"
    echo ""
    echo "Get your key from: https://platform.openai.com/api-keys"
    exit 1
fi

API_KEY="$1"

echo "🔑 Setting OpenAI API Key..."
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

# Set the secret
$SUPABASE_CMD secrets set OPENAI_API_KEY="$API_KEY"

echo ""
echo "✅ OpenAI API key set successfully!"
echo ""
echo "Verify with:"
echo "   $SUPABASE_CMD secrets list"
