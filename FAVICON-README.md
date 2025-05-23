# Favicon Files for Your Portfolio Website

This directory contains several files to help you fix the 404 errors related to missing favicon files in your portfolio website.

## Quick Solution: Download Pre-made Favicon Files

### For Windows Users:
1. Right-click on `download-favicons.ps1` and select "Run with PowerShell"
2. The script will download the necessary favicon files to your `public` directory

### For macOS/Linux Users:
1. Open Terminal
2. Navigate to this directory
3. Run: `chmod +x download-favicons.sh`
4. Run: `./download-favicons.sh`

## Alternative: Generate Custom Favicons

### Option 1: Use the HTML Generator
1. Open `favicon-generator.html` in your browser
2. Choose colors and text for your favicon
3. Click "Generate" for each favicon size
4. Save the files to your `public` directory

### Option 2: Use an Online Favicon Generator
1. Visit [favicon.io](https://favicon.io/) or another favicon generator
2. Create favicons from text, image, or emoji
3. Download the generated package
4. Extract and place the following files in your `public` directory:
   - `favicon.ico`
   - `android-chrome-192x192.png`
   - `android-chrome-512x512.png`
   - `apple-touch-icon.png`

## Required Files

Your website is looking for these specific files:
- `favicon.ico` - The classic favicon shown in browser tabs
- `android-chrome-192x192.png` - Used for Android home screen icons
- `android-chrome-512x512.png` - Used for Android home screen icons (larger devices)
- `apple-touch-icon.png` - Used for iOS home screen icons

## Verifying the Fix

After adding the favicon files to your `public` directory:
1. Run your development server: `npm run dev` or `pnpm dev`
2. Check if the 404 errors for favicon files are resolved

## Troubleshooting

If you still see 404 errors:
- Make sure the files are in the correct location (directly in the `public` directory)
- Make sure the filenames match exactly (case-sensitive)
- Try clearing your browser cache
- Restart your development server
