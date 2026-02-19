#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking LumiAffirm Setup...\n');

let allGood = true;

// Check .env file
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasUrl = envContent.includes('EXPO_PUBLIC_SUPABASE_URL=') && 
                 !envContent.match(/EXPO_PUBLIC_SUPABASE_URL=\s*$/);
  const hasKey = envContent.includes('EXPO_PUBLIC_SUPABASE_ANON_KEY=') && 
                 !envContent.match(/EXPO_PUBLIC_SUPABASE_ANON_KEY=\s*$/);
  
  if (hasUrl && hasKey) {
    console.log('✅ .env file configured');
  } else {
    console.log('⚠️  .env file exists but credentials not filled in');
    allGood = false;
  }
} else {
  console.log('❌ .env file not found');
  allGood = false;
}

// Check node_modules
const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('✅ Dependencies installed');
} else {
  console.log('❌ Dependencies not installed (run: npm install)');
  allGood = false;
}

// Check Supabase function
const functionPath = path.join(__dirname, '..', 'supabase', 'functions', 'generate-affirmation', 'index.ts');
if (fs.existsSync(functionPath)) {
  console.log('✅ Supabase Edge Function file exists');
} else {
  console.log('❌ Supabase Edge Function not found');
  allGood = false;
}

// Check SQL setup file
const sqlPath = path.join(__dirname, '..', 'supabase', 'setup.sql');
if (fs.existsSync(sqlPath)) {
  console.log('✅ SQL setup file exists');
} else {
  console.log('❌ SQL setup file not found');
  allGood = false;
}

console.log('\n' + '='.repeat(40));
if (allGood) {
  console.log('✅ Setup looks good!');
} else {
  console.log('⚠️  Some setup steps are incomplete');
  console.log('📖 See SETUP.md for detailed instructions');
}
console.log('='.repeat(40));
