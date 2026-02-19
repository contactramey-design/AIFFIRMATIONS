#!/bin/bash

# 🚀 LumiAffirm Deployment Script
# This script prepares your app for deployment

set -e

echo "🚀 LumiAffirm Deployment Preparation"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Supabase CLI is available
SUPABASE_CMD="./bin/supabase"
if [ ! -f "$SUPABASE_CMD" ]; then
    echo -e "${RED}❌ Supabase CLI not found at $SUPABASE_CMD${NC}"
    echo "   Installing Supabase CLI..."
    
    mkdir -p bin
    ARCH=$(uname -m)
    if [ "$ARCH" = "arm64" ]; then
        ARCH="arm64"
    else
        ARCH="amd64"
    fi
    
    curl -L "https://github.com/supabase/cli/releases/latest/download/supabase_darwin_${ARCH}.tar.gz" -o /tmp/supabase.tar.gz
    tar -xzf /tmp/supabase.tar.gz -C bin/
    chmod +x bin/supabase
    echo -e "${GREEN}✅ Supabase CLI installed${NC}"
else
    echo -e "${GREEN}✅ Supabase CLI found${NC}"
fi

# Check .env file
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env file not found${NC}"
    echo "   Creating .env file..."
    cat > .env << 'EOF'
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EOF
    echo -e "${YELLOW}⚠️  Please fill in your Supabase credentials in .env${NC}"
else
    echo -e "${GREEN}✅ .env file exists${NC}"
fi

# Check node_modules
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing npm dependencies...${NC}"
    npm install
else
    echo -e "${GREEN}✅ Dependencies installed${NC}"
fi

echo ""
echo "===================================="
echo "📋 Next Steps (Manual):"
echo "===================================="
echo ""
echo "1. 🔐 Login to Supabase:"
echo "   $SUPABASE_CMD login"
echo "   (This will open your browser)"
echo ""
echo "2. 🔗 Link your project:"
echo "   $SUPABASE_CMD link --project-ref ypeskhbgeyghqrsnbfmk"
echo ""
echo "3. 📊 Set up database (if not done):"
echo "   - Go to: https://supabase.com/dashboard"
echo "   - Open SQL Editor"
echo "   - Run the SQL from: supabase/setup.sql"
echo ""
echo "4. 🚀 Deploy Edge Function:"
echo "   $SUPABASE_CMD functions deploy generate-affirmation"
echo ""
echo "5. 🔑 Set OpenAI API Key:"
echo "   $SUPABASE_CMD secrets set OPENAI_API_KEY=sk-your-key-here"
echo "   (Get key from: https://platform.openai.com/api-keys)"
echo ""
echo "6. ✅ Verify secrets:"
echo "   $SUPABASE_CMD secrets list"
echo ""
echo "7. 🎉 Start the app:"
echo "   npm start"
echo ""
echo "===================================="
echo ""

# Check if already logged in
if $SUPABASE_CMD projects list &>/dev/null; then
    echo -e "${GREEN}✅ Already logged in to Supabase!${NC}"
    echo ""
    echo "You can now run:"
    echo "  $SUPABASE_CMD link --project-ref ypeskhbgeyghqrsnbfmk"
    echo "  $SUPABASE_CMD functions deploy generate-affirmation"
else
    echo -e "${YELLOW}⚠️  Not logged in. Run: $SUPABASE_CMD login${NC}"
fi

echo ""
echo "For detailed instructions, see: COMPLETE_SETUP.md"
echo ""
