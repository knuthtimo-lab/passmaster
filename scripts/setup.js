#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 PassMaster Setup Script');
console.log('==========================');

// Create .env.local if it doesn't exist
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  const envContent = `# Site URL for metadata and PWA
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# For production, change to your actual domain
# NEXT_PUBLIC_SITE_URL=https://passmaster.app
`;
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file');
} else {
  console.log('ℹ️  .env.local already exists');
}

// Check if node_modules exists
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies...');
  const { execSync } = require('child_process');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
} else {
  console.log('ℹ️  Dependencies already installed');
}

console.log('\n🎉 Setup complete!');
console.log('\nNext steps:');
console.log('1. Run "npm run dev" to start the development server');
console.log('2. Open http://localhost:3000 in your browser');
console.log('3. Add icon files to public/icons/ directory');
console.log('4. Update .env.local with your production URL when deploying');
console.log('\nHappy coding! 🚀');
