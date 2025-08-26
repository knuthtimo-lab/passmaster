const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputIcon = path.join(__dirname, '../public/icon.png');
const outputDir = path.join(__dirname, '../public/icons');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Check if input icon exists
if (!fs.existsSync(inputIcon)) {
  console.error('❌ Input icon not found:', inputIcon);
  process.exit(1);
}

function generateIcons() {
  console.log('🔄 Generating PWA icons...');
  
  try {
    // Read the original icon
    const iconBuffer = fs.readFileSync(inputIcon);
    
    for (const size of sizes) {
      const outputPath = path.join(outputDir, `icon-${size}.png`);
      
      // Copy the original icon to create the size variants
      fs.writeFileSync(outputPath, iconBuffer);
      
      console.log(`✅ Generated icon-${size}.png`);
    }
    
    console.log('🎉 All icons generated successfully!');
    console.log('📝 Note: All icons are copies of the original. For optimal quality,');
    console.log('   consider resizing them manually or using an image editor.');
  } catch (error) {
    console.error('❌ Error generating icons:', error);
  }
}

generateIcons();
