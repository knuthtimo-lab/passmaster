const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, '../public/screenshots');

// Ensure screenshots directory exists
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Create a simple placeholder screenshot
function createPlaceholderScreenshot(filename, width, height, description) {
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f3f4f6"/>
  <rect x="0" y="0" width="100%" height="60" fill="#3b82f6"/>
  <text x="50%" y="35" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">PassMaster</text>
  <text x="50%" y="80" text-anchor="middle" fill="#6b7280" font-family="Arial, sans-serif" font-size="16">${description}</text>
  <rect x="50" y="120" width="${width-100}" height="200" rx="8" fill="white" stroke="#d1d5db" stroke-width="2"/>
  <text x="50%" y="150" text-anchor="middle" fill="#374151" font-family="Arial, sans-serif" font-size="14">Password Generator Interface</text>
  <rect x="80" y="180" width="${width-160}" height="40" rx="4" fill="#f9fafb" stroke="#d1d5db"/>
  <text x="50%" y="205" text-anchor="middle" fill="#6b7280" font-family="monospace" font-size="12">••••••••••••••••</text>
  <rect x="80" y="240" width="120" height="40" rx="4" fill="#3b82f6"/>
  <text x="140" y="265" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="14">Generate</text>
  <text x="50%" y="${height-30}" text-anchor="middle" fill="#9ca3af" font-family="Arial, sans-serif" font-size="12">Screenshot Placeholder</text>
</svg>`;

  const outputPath = path.join(screenshotsDir, filename);
  fs.writeFileSync(outputPath, svgContent);
  console.log(`✅ Created ${filename}`);
}

function createScreenshots() {
  console.log('🔄 Creating PWA screenshots...');
  
  try {
    // Desktop screenshot
    createPlaceholderScreenshot('desktop.png', 1280, 720, 'Desktop Interface');
    
    // Mobile screenshot
    createPlaceholderScreenshot('mobile.png', 390, 844, 'Mobile Interface');
    
    console.log('🎉 All screenshots created successfully!');
    console.log('📝 Note: These are placeholder SVGs. Replace with actual screenshots');
    console.log('   of your application for better app store listings.');
  } catch (error) {
    console.error('❌ Error creating screenshots:', error);
  }
}

createScreenshots();
