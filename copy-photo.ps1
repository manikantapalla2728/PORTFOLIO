# Copy Manikanta Palla portrait photo to assets directory
$sourceEdited = "C:\Users\HP\.gemini\antigravity\brain\63a82ae6-9dd5-42af-af0d-d73480599588\profile_portrait_1791118406443.jpg"
$sourceOriginal = "C:\Users\HP\.gemini\antigravity\brain\68b7961f-7967-4673-8de9-6af923b89f0c\.user_uploaded\media_1791117862918.jpg"
$dest = Join-Path $PSScriptRoot "assets\manikanta-profile.jpg"

if (Test-Path $sourceEdited) {
    Copy-Item -Path $sourceEdited -Destination $dest -Force
    Write-Host "Success: Copied edited profile photo to $dest" -ForegroundColor Green
} elseif (Test-Path $sourceOriginal) {
    Copy-Item -Path $sourceOriginal -Destination $dest -Force
    Write-Host "Success: Copied original uploaded photo to $dest" -ForegroundColor Green
} else {
    Write-Host "Source image not found." -ForegroundColor Yellow
}
