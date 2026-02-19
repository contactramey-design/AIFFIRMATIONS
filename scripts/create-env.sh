#!/bin/bash

if [ -f .env ]; then
    echo "⚠️  .env file already exists"
    read -p "Overwrite? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Cancelled."
        exit 0
    fi
fi

cat > .env << 'EOF'
# Supabase Configuration
# Get these from: https://supabase.com/dashboard → Your Project → Settings → API
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=

# OpenAI API Key (for Supabase Edge Function secret)
# Get this from: https://platform.openai.com/api-keys
# Set it using: supabase secrets set OPENAI_API_KEY=your_key_here
EOF

echo "✅ .env file created!"
echo ""
echo "Next: Fill in your Supabase credentials from:"
echo "   https://supabase.com/dashboard → Settings → API"
