$ErrorActionPreference = 'Stop'
$dst = 'C:\Users\lucas\Documents\Vaults\Work\Projetos\Lighthouse - Vale\assets'
$src = Resolve-Path (Join-Path (Get-Location) 'img\works\ProductionApp') | Select-Object -ExpandProperty Path

New-Item -ItemType Directory -Force -Path $dst | Out-Null

$map = @{
    'Capa.png'                 = 'capa.png'
    'Desafio\Workflow.webp'    = 'Workflow.webp'
    'Desafio\Workflow2.webp'   = 'Workflow2.webp'
    'Overview\Overview2.webp'  = 'Overview2.webp'
    'Overview\Overview3.webp'  = 'Overview3.webp'
    'Overview\Overview4.webp'  = 'Overview4.webp'
    'Overview\Overview5.webp'  = 'Overview5.webp'
    'Solucao\Cardr.webp'       = 'Cardr.webp'
    'Galeria\MVPt.webp'        = 'MVPt.webp'
    'Galeria\mockt.webp'       = 'mockt.webp'
    'Galeria\Componentst.webp' = 'Componentst.webp'
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
