$urls = @{
    'duo_magic.gif' = 'https://cdn.dribbble.com/userupload/36775849/file/original-f7ba6bee3003820791de31572cb850fe.gif';
    'muddy_buddy.gif' = 'https://cdn.dribbble.com/userupload/24468198/file/original-d3c00e8e466796786aaf8d10183359c7.gif';
    'park_ranger.gif' = 'https://cdn.dribbble.com/userupload/24468195/file/original-facc53ebabd2be3a9348b59f69d94de3.gif';
    'excited_sheep.gif' = 'https://cdn.dribbble.com/userupload/24467885/file/original-44287ffc939634f1997d86f7b9937ec8.gif';
    'crying_baby.gif' = 'https://cdn.dribbble.com/userupload/24467888/file/original-b96e95c4779268f86f381f88764b85da.gif';
    'streak_calendar.gif' = 'https://cdn.dribbble.com/userupload/29628899/file/original-6f90f6f4c83a7e671816e87fb0fa19e0.gif';
    'xp_challenge.gif' = 'https://cdn.dribbble.com/userupload/36961493/file/original-a151051a8405255bda5e55a82f450814.gif';
    'easter_egg.gif' = 'https://cdn.dribbble.com/userupload/27958380/file/original-bf8e71b54b533e57d2da987820846329.gif';
    'mastery_quiz.gif' = 'https://cdn.dribbble.com/userupload/28813412/file/original-ccef70b63e77aa5f6ce1e83256a7d692.gif';
    'crown_duo.gif' = 'https://cdn.dribbble.com/userupload/27751974/file/original-290ae50f4bfa9c75956f29c2183506bb.gif'
};
if (!(Test-Path 'public/assets/animations')) { New-Item -ItemType Directory 'public/assets/animations' }
foreach ($name in $urls.Keys) {
    Write-Host "Downloading $name ...";
    try {
        Invoke-WebRequest -Uri $urls[$name] -OutFile "public/assets/animations/$name";
    } catch {
        Write-Host "Failed to download $name";
    }
}
