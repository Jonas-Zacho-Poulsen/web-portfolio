const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Function to create a simple colored square PNG
function createColoredSquare(size, color, outputPath) {
  console.log(`Creating ${outputPath}...`);
  
  // Create a simple colored square as a PNG
  const pngData = Buffer.from(
    `iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==`,
    'base64'
  );
  
  fs.writeFileSync(outputPath, pngData);
  console.log(`Created ${outputPath} successfully.`);
}

// Create simple PNG files for favicons
createColoredSquare(192, '#19c37d', path.join(publicDir, 'android-chrome-192x192.png'));
createColoredSquare(512, '#19c37d', path.join(publicDir, 'android-chrome-512x512.png'));
createColoredSquare(180, '#19c37d', path.join(publicDir, 'apple-touch-icon.png'));

console.log('\nSimple favicon PNG files have been created.');
console.log('Note: These are very basic placeholder files.');
console.log('For better favicons, consider using a proper favicon generator like https://favicon.io');
