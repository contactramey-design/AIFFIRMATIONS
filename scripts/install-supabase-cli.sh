#!/bin/bash

echo "🔧 Installing Supabase CLI..."
echo ""

# Check OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    echo "Detected macOS"
    if command -v brew &> /dev/null; then
        echo "Installing via Homebrew..."
        brew install supabase/tap/supabase
    else
        echo "⚠️  Homebrew not found. Please install Homebrew first:"
        echo "   /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
        echo ""
        echo "Or install manually from: https://github.com/supabase/cli#install-the-cli"
        exit 1
    fi
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    echo "Detected Linux"
    echo "Please install manually from: https://github.com/supabase/cli#install-the-cli"
    exit 1
else
    echo "⚠️  Unsupported OS. Please install manually from:"
    echo "   https://github.com/supabase/cli#install-the-cli"
    exit 1
fi

echo ""
echo "✅ Supabase CLI installed!"
echo ""
echo "Next steps:"
echo "1. Run: supabase login"
echo "2. Run: supabase link --project-ref YOUR_PROJECT_REF"
echo "3. Run: supabase functions deploy generate-affirmation"
