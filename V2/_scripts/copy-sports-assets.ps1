$ErrorActionPreference = 'Stop'
$dst = 'C:\Users\lucas\Documents\Vaults\Work\Projetos\Sports Experience - DirecTV\assets'
$src = Resolve-Path (Join-Path (Get-Location) 'img\works\Sports') | Select-Object -ExpandProperty Path

New-Item -ItemType Directory -Force -Path $dst | Out-Null

$map = @{
    'Capa.webp'                = 'capa.webp'
    'Desafio\Desafio.webp'     = 'Desafio.webp'
    'Overview\Overview1.webp'  = 'Overview1.webp'
    'Overview\Overview2.webp'  = 'Overview2.webp'
    'Overview\Overview3.webp'  = 'Overview3.webp'
    'Overview\Overview4.webp'  = 'Overview4.webp'
    'Overview\Overview5.webp'  = 'Overview5.webp'
    'Galeria\Colors3t.webp'    = 'Colors3t.webp'
    'Galeria\profilet.webp'    = 'profilet.webp'
    'Galeria\bett.webp'        = 'bett.webp'
    'Galeria\heatt.webp'       = 'heatt.webp'
    'Galeria\static2t.webp'    = 'static2t.webp'
    'Entrega\Entrega1t.webp'   = 'Entrega1t.webp'
    'Entrega\Entrega2t.webp'   = 'Entrega2t.webp'
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
