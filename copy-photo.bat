@echo off
echo Copying Manikanta Palla portrait photo to assets directory...
if exist "C:\Users\HP\.gemini\antigravity\brain\63a82ae6-9dd5-42af-af0d-d73480599588\profile_portrait_1791118406443.jpg" (
    copy /Y "C:\Users\HP\.gemini\antigravity\brain\63a82ae6-9dd5-42af-af0d-d73480599588\profile_portrait_1791118406443.jpg" "assets\manikanta-profile.jpg"
    echo Success: Edited high-res profile photo copied to assets\manikanta-profile.jpg
) else if exist "C:\Users\HP\.gemini\antigravity\brain\68b7961f-7967-4673-8de9-6af923b89f0c\.user_uploaded\media_1791117862918.jpg" (
    copy /Y "C:\Users\HP\.gemini\antigravity\brain\68b7961f-7967-4673-8de9-6af923b89f0c\.user_uploaded\media_1791117862918.jpg" "assets\manikanta-profile.jpg"
    echo Success: User uploaded profile photo copied to assets\manikanta-profile.jpg
) else (
    echo Note: Source photo path not found on this machine.
)
pause
