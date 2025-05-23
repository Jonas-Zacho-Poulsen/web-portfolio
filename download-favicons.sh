#!/bin/bash

# Create the public directory if it doesn't exist
mkdir -p public

# Define favicon URLs - these are simple placeholder favicons
declare -A favicon_urls=(
  ["favicon.ico"]="https://raw.githubusercontent.com/favicon-community/favicon.ico/master/favicon.ico"
  ["android-chrome-192x192.png"]="https://raw.githubusercontent.com/favicon-community/android-chrome-192x192.png/master/android-chrome-192x192.png"
  ["android-chrome-512x512.png"]="https://raw.githubusercontent.com/favicon-community/android-chrome-512x512.png/master/android-chrome-512x512.png"
  ["apple-touch-icon.png"]="https://raw.githubusercontent.com/favicon-community/apple-touch-icon.png/master/apple-touch-icon.png"
)

# Download each favicon
for favicon in "${!favicon_urls[@]}"; do
  output_path="public/$favicon"
  echo "Downloading $favicon to $output_path..."
  
  if command -v curl &> /dev/null; then
    curl -s -o "$output_path" "${favicon_urls[$favicon]}"
    download_status=$?
  elif command -v wget &> /dev/null; then
    wget -q -O "$output_path" "${favicon_urls[$favicon]}"
    download_status=$?
  else
    echo "Error: Neither curl nor wget is installed. Please install one of them and try again."
    exit 1
  fi
  
  if [ $download_status -eq 0 ]; then
    echo "Downloaded $favicon successfully."
  else
    echo "Failed to download $favicon."
  fi
done

echo ""
echo "All favicon files have been downloaded to the public directory."
echo "You can now run 'npm run dev' to check if the 404 errors are resolved."
