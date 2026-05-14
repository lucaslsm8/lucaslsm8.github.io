$ErrorActionPreference = 'Stop'
$dst = 'C:\Users\lucas\Documents\Vaults\Work\Projetos\Samarco - Dashboard PMO\assets'
$src = Resolve-Path (Join-Path (Get-Location) 'img\works\Samarco') | Select-Object -ExpandProperty Path

New-Item -ItemType Directory -Force -Path $dst | Out-Null

$map = @{
    'Capa.svg' = 'Capa.svg'
}

foreach ($k in $map.Keys) {
    $from = Join-Path $src $k
    $to   = Join-Path $dst $map[$k]
    if (Test-Path $from) {
        Copy-Item -Force $from $to
        $size = (Get-Item $to).Length
        Write-Host ("OK   {0,-20}  ({1} bytes)" -f $map[$k], $size)
    } else {
        Write-Host ("MISS {0}" -f $from)
    }
}

Write-Host ''
Write-Host '--- final contents of assets/ ---'
Get-ChildItem $dst | Format-Table Name, Length -AutoSize
