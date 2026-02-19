#!/bin/bash

echo "🚀 LumiAffirm Setup Script"
echo "=========================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << 'EOF'
# Supabase Configuration
# Get these from: https://supabase.com/dashboard → Your Project → Settings → API
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EOF
    echo "✅ .env file created! Please fill in your Supabase credentials."
else
    echo "✅ .env file already exists"
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Check for Supabase CLI
if command -v supabase &> /dev/null; then
    echo "✅ Supabase CLI is installed"
    supabase --version
else
    echo "⚠️  Supabase CLI not found. Installing..."
    npm install -g supabase
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Create a Supabase project at https://supabase.com"
echo "2. Copy your Project URL and anon key to .env"
echo "3. Run the SQL from supabase/setup.sql in Supabase SQL Editor"
echo "4. Run: supabase login"
echo "5. Run: supabase link --project-ref YOUR_PROJECT_REF"
echo "6. Run: supabase secrets set OPENAI_API_KEY=your_key"
echo "7. Run: supabase functions deploy generate-affirmation"
echo "8. Run: npm start"
