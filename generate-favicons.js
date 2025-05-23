const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Function to generate a simple favicon
function generateFavicon(size, filename) {
  console.log(`Generating ${filename}...`);
  
  // Create canvas with specified size
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Fill background with a color (using the theme color from site.webmanifest)
  ctx.fillStyle = '#19c37d';
  ctx.fillRect(0, 0, size, size);
  
  // Add text (initials) if the size is large enough
  if (size >= 32) {
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Adjust font size based on canvas size
    const fontSize = Math.floor(size * 0.5);
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    
    // Add initials
    ctx.fillText('JP', size / 2, size / 2);
  }
  
  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(publicDir, filename), buffer);
  console.log(`Generated ${filename} successfully.`);
}

// Generate PNG favicons
generateFavicon(192, 'android-chrome-192x192.png');
generateFavicon(512, 'android-chrome-512x512.png');
generateFavicon(180, 'apple-touch-icon.png');
generateFavicon(32, 'favicon-32x32.png');
generateFavicon(16, 'favicon-16x16.png');

console.log('\nNote: This script generated PNG files for favicons.');
console.log('For favicon.ico, you need to convert one of the PNG files to ICO format.');
console.log('You can use an online converter like https://favicon.io/favicon-converter/');
console.log('\nAlternatively, you can run the download-favicons.ps1 script to download pre-made favicon files.');
