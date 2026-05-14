$locs = @(
    (Join-Path $env:USERPROFILE 'Work'),
    (Join-Path $env:USERPROFILE 'Documents\Work'),
    (Join-Path $env:USERPROFILE 'Desktop\Work'),
    (Join-Path $env:USERPROFILE 'OneDrive\Documents\Work'),
    (Join-Path $env:USERPROFILE 'OneDrive\Work'),
    (Join-Path $env:USERPROFILE 'Obsidian\Work'),
    (Join-Path $env:USERPROFILE 'Documents\Obsidian\Work'),
    (Join-Path $env:USERPROFILE 'OneDrive\Desktop\Work')
)
foreach ($p in $locs) {
    if (Test-Path $p) {
        Write-Host "FOUND: $p"
        if (Test-Path (Join-Path $p '.obsidian')) {
            Write-Host "  -> has .obsidian (is a vault)"
        }
    }
}

# Also try to read Obsidian's config to find registered vaults
$cfg = Join-Path $env:APPDATA 'obsidian\obsidian.json'
if (Test-Path $cfg) {
    Write-Host "`nObsidian config found: $cfg"
    Get-Content $cfg -Raw
}
