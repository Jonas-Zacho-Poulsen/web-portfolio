# PowerShell script to create simple favicon files

# Create the public directory if it doesn't exist
$publicDir = "public"
if (-not (Test-Path $publicDir)) {
    New-Item -ItemType Directory -Path $publicDir
}

# Function to create a simple colored square image
function Create-ColoredSquare {
    param (
        [string]$outputPath,
        [int]$width,
        [int]$height,
        [string]$color = "#19c37d"  # Default color from your site.webmanifest
    )
    
    # Create an HTML file that will generate the image
    $tempHtmlPath = [System.IO.Path]::GetTempFileName() + ".html"
    
    $htmlContent = @"
<!DOCTYPE html>
<html>
<head>
    <title>Image Generator</title>
    <style>
        body { margin: 0; padding: 0; }
        #square { 
            width: ${width}px; 
            height: ${height}px; 
            background-color: ${color};
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-family: Arial, sans-serif;
            font-weight: bold;
            font-size: ${([Math]::Floor($width * 0.5))}px;
        }
    </style>
</head>
<body>
    <div id="square">JP</div>
    <script>
        // This script will automatically download the image
        setTimeout(() => {
            const canvas = document.createElement('canvas');
            canvas.width = ${width};
            canvas.height = ${height};
            const ctx = canvas.getContext('2d');
            
            // Draw background
            ctx.fillStyle = '${color}';
            ctx.fillRect(0, 0, ${width}, ${height});
            
            // Draw text
            ctx.fillStyle = 'white';
            ctx.font = 'bold ${([Math]::Floor($width * 0.5))}px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('JP', ${width}/2, ${height}/2);
            
            // Convert to data URL
            const dataUrl = canvas.toDataURL('image/png');
            
            // Create download link
            const link = document.createElement('a');
            link.download = '${[System.IO.Path]::GetFileName($outputPath)}';
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, 500);
    </script>
</body>
</html>
"@
    
    $htmlContent | Out-File -FilePath $tempHtmlPath -Encoding utf8
    
    Write-Host "Created temporary HTML file at $tempHtmlPath"
    Write-Host "Please open this file in your browser, and it will automatically download the image."
    Write-Host "After downloading, rename the file to $([System.IO.Path]::GetFileName($outputPath)) and place it in the $publicDir directory."
    
    # Open the HTML file in the default browser
    Start-Process $tempHtmlPath
}

# Create favicon files
Write-Host "Creating favicon files..."
Create-ColoredSquare -outputPath "$publicDir\android-chrome-192x192.png" -width 192 -height 192
Start-Sleep -Seconds 1
Create-ColoredSquare -outputPath "$publicDir\android-chrome-512x512.png" -width 512 -height 512
Start-Sleep -Seconds 1
Create-ColoredSquare -outputPath "$publicDir\apple-touch-icon.png" -width 180 -height 180
Start-Sleep -Seconds 1
Create-ColoredSquare -outputPath "$publicDir\favicon.png" -width 32 -height 32

Write-Host "`nInstructions:"
Write-Host "1. Four browser windows should have opened, each generating a favicon image."
Write-Host "2. Save each downloaded image to the $publicDir directory with the correct filename."
Write-Host "3. For favicon.ico, you'll need to convert the favicon.png file using an online converter."
Write-Host "   Visit https://favicon.io/favicon-converter/ to convert the PNG to ICO."
Write-Host "`nAfter placing all files in the $publicDir directory, run 'npm run dev' to check if the 404 errors are resolved."
