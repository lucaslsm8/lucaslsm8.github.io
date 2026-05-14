$ErrorActionPreference = 'Stop'
$vault = 'C:\Users\lucas\Documents\Vaults\Work'

$pairs = @(
    @{ From = '_obsidian-staging\_AI-Context.md';                                                      To = Join-Path $vault '_AI-Context.md' }
    @{ From = 'AGENTS.md';                                                                             To = Join-Path $vault 'AGENTS.md' }  # exceção: fonte vive na raiz do repo (não em _obsidian-staging)
    @{ From = '_obsidian-staging\Projetos\Sports Experience - DirecTV\Sports Experience - DirecTV.md'; To = Join-Path $vault 'Projetos\Sports Experience - DirecTV\Sports Experience - DirecTV.md' }
    @{ From = '_obsidian-staging\Projetos\Lighthouse - Vale\Lighthouse - Vale.md';                     To = Join-Path $vault 'Projetos\Lighthouse - Vale\Lighthouse - Vale.md' }
    @{ From = '_obsidian-staging\Projetos\Samarco - Dashboard PMO\Samarco - Dashboard PMO.md';         To = Join-Path $vault 'Projetos\Samarco - Dashboard PMO\Samarco - Dashboard PMO.md' }
)

foreach ($p in $pairs) {
    $from = Join-Path (Get-Location) $p.From
    $to   = $p.To
    $dir  = Split-Path -Parent $to
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    Copy-Item -Force $from $to
    $item = Get-Item $to
    Write-Host ("OK  {0}  ({1} bytes)" -f $item.FullName, $item.Length)
}
