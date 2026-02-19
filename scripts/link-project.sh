#!/bin/bash

# Link Supabase Project
# Usage: ./scripts/link-project.sh [project-ref]

set -e

cd "$(dirname "$0")/.."

SUPABASE_CMD="./bin/supabase"
PROJECT_REF="${1:-ypeskhbgeyghqrsnbfmk}"

if [ ! -f "$SUPABASE_CMD" ]; then
    echo "❌ Supabase CLI not found. Run ./deploy.sh first"
    exit 1
fi

echo "🔗 Linking Supabase Project: $PROJECT_REF"
echo ""

# Check if logged in
if ! $SUPABASE_CMD projects list &>/dev/null; then
    echo "⚠️  Not logged in. Please run:"
    echo "   $SUPABASE_CMD login"
    exit 1
fi

# Link the project
$SUPABASE_CMD link --project-ref "$PROJECT_REF"

echo ""
echo "✅ Project linked successfully!"
echo ""
echo "Next: Deploy the edge function:"
echo "   ./scripts/deploy-function.sh"
