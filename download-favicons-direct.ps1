# PowerShell script to download favicon files from a reliable source

# Create the public directory if it doesn't exist
$publicDir = "public"
if (-not (Test-Path $publicDir)) {
    New-Item -ItemType Directory -Path $publicDir
}

# Define favicon URLs from a reliable source
$faviconUrls = @{
    "favicon.ico" = "https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/favicon.ico"
    "android-chrome-192x192.png" = "https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/android-chrome-192x192.png"
    "android-chrome-512x512.png" = "https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/android-chrome-512x512.png"
    "apple-touch-icon.png" = "https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/apple-touch-icon.png"
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
