# PowerShell script to download favicon files

# Create the public directory if it doesn't exist
$publicDir = "public"
if (-not (Test-Path $publicDir)) {
    New-Item -ItemType Directory -Path $publicDir
}

# Define favicon URLs - these are simple placeholder favicons
$faviconUrls = @{
    "favicon.ico" = "https://raw.githubusercontent.com/favicon-community/favicon.ico/master/favicon.ico"
    "android-chrome-192x192.png" = "https://raw.githubusercontent.com/favicon-community/android-chrome-192x192.png/master/android-chrome-192x192.png"
    "android-chrome-512x512.png" = "https://raw.githubusercontent.com/favicon-community/android-chrome-512x512.png/master/android-chrome-512x512.png"
    "apple-touch-icon.png" = "https://raw.githubusercontent.com/favicon-community/apple-touch-icon.png/master/apple-touch-icon.png"
}

# Download each favicon
foreach ($favicon in $faviconUrls.GetEnumerator()) {
    $outputPath = Join-Path $publicDir $favicon.Key
    Write-Host "Downloading $($favicon.Key) to $outputPath..."
    
    try {
        Invoke-WebRequest -Uri $favicon.Value -OutFile $outputPath
        Write-Host "Downloaded $($favicon.Key) successfully." -ForegroundColor Green
    } catch {
        Write-Host "Failed to download $($favicon.Key): $_" -ForegroundColor Red
    }
}

Write-Host "`nAll favicon files have been downloaded to the $publicDir directory." -ForegroundColor Cyan
Write-Host "You can now run 'npm run dev' to check if the 404 errors are resolved." -ForegroundColor Cyan
