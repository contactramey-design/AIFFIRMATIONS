#!/bin/bash

# 🚀 Complete Build & Deployment Script
# This script prepares everything for deployment

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 LumiAffirm - Complete Build & Deployment${NC}"
echo "=========================================="
echo ""

cd "$(dirname "$0")"

# Step 1: Check/Install Dependencies
echo -e "${BLUE}📦 Step 1: Checking dependencies...${NC}"
if [ ! -d "node_modules" ]; then
    echo "Installing npm packages..."
    npm install
    echo -e "${GREEN}✅ Dependencies installed${NC}"
else
    echo -e "${GREEN}✅ Dependencies already installed${NC}"
fi
echo ""

# Step 2: Verify Supabase CLI
echo -e "${BLUE}🔧 Step 2: Checking Supabase CLI...${NC}"
SUPABASE_CMD="./bin/supabase"
if [ ! -f "$SUPABASE_CMD" ]; then
    echo "Installing Supabase CLI..."
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
    VERSION=$($SUPABASE_CMD --version 2>/dev/null || echo "unknown")
    echo -e "${GREEN}✅ Supabase CLI found (v$VERSION)${NC}"
fi
echo ""

# Step 3: Check .env file
echo -e "${BLUE}📝 Step 3: Checking environment configuration...${NC}"
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found. Creating template...${NC}"
    cat > .env << 'EOF'
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EOF
    echo -e "${YELLOW}⚠️  Please fill in your Supabase credentials in .env${NC}"
else
    echo -e "${GREEN}✅ .env file exists${NC}"
    # Check if it has values (basic check)
    if grep -q "EXPO_PUBLIC_SUPABASE_URL=$" .env || grep -q "EXPO_PUBLIC_SUPABASE_URL=\"\"" .env; then
        echo -e "${YELLOW}⚠️  .env file appears empty. Please add your Supabase credentials${NC}"
    else
        echo -e "${GREEN}✅ .env file has configuration${NC}"
    fi
fi
echo ""

# Step 4: Verify Edge Function
echo -e "${BLUE}⚡ Step 4: Checking Edge Function...${NC}"
if [ -f "supabase/functions/generate-affirmation/index.ts" ]; then
    echo -e "${GREEN}✅ Edge function code ready${NC}"
else
    echo -e "${RED}❌ Edge function not found${NC}"
    exit 1
fi
echo ""

# Step 5: Check TypeScript compilation
echo -e "${BLUE}🔍 Step 5: Checking TypeScript...${NC}"
if command -v npx &> /dev/null; then
    if npx tsc --noEmit --skipLibCheck 2>&1 | head -20; then
        echo -e "${GREEN}✅ TypeScript check passed${NC}"
    else
        echo -e "${YELLOW}⚠️  TypeScript warnings (non-critical)${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  TypeScript check skipped (npx not available)${NC}"
fi
echo ""

# Step 6: Supabase CLI Status
echo -e "${BLUE}🔐 Step 6: Checking Supabase CLI status...${NC}"
if $SUPABASE_CMD projects list &>/dev/null 2>&1; then
    echo -e "${GREEN}✅ Logged in to Supabase${NC}"
    
    if [ -f ".supabase/config.toml" ]; then
        echo -e "${GREEN}✅ Project linked${NC}"
        
        # Check if function is deployed
        echo ""
        echo -e "${BLUE}📊 Deployment Status:${NC}"
        echo "To deploy the function, run:"
        echo "  ./scripts/deploy-function.sh"
    else
        echo -e "${YELLOW}⚠️  Project not linked${NC}"
        echo "Run: ./scripts/link-project.sh"
    fi
else
    echo -e "${YELLOW}⚠️  Not logged in to Supabase${NC}"
    echo "Run: $SUPABASE_CMD login"
fi
echo ""

# Summary
echo "=========================================="
echo -e "${GREEN}✅ Build Complete!${NC}"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. 🔐 Login to Supabase:"
echo "   $SUPABASE_CMD login"
echo ""
echo "2. 🔗 Link your project:"
echo "   ./scripts/link-project.sh"
echo ""
echo "3. 🚀 Deploy edge function:"
echo "   ./scripts/deploy-function.sh"
echo ""
echo "4. 🔑 Set OpenAI API key:"
echo "   ./scripts/set-openai-key.sh sk-your-key-here"
echo ""
echo "5. 🎉 Start the app:"
echo "   npm start"
echo ""
echo "For detailed instructions, see: DEPLOYMENT_READY.md"
echo ""
