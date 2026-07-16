# Servidor local acessivel no PC e no celular (mesma rede Wi-Fi)
param(
    [int]$Port = 8000
)

$ErrorActionPreference = "Stop"
$projectRoot = $PSScriptRoot

# Libera porta no Firewall do Windows (rede privada)
$ruleName = "Barbearia Dev Server $Port"
$existingRule = Get-NetFirewallRule -DisplayName $ruleName -ErrorAction SilentlyContinue
if (-not $existingRule) {
    try {
        New-NetFirewallRule -DisplayName $ruleName `
            -Direction Inbound `
            -Action Allow `
            -Protocol TCP `
            -LocalPort $Port `
            -Profile Private `
            -ErrorAction Stop | Out-Null
        Write-Host "Firewall: regra criada para porta $Port (rede privada)." -ForegroundColor Green
    } catch {
        Write-Host "Firewall: nao foi possivel criar regra automaticamente." -ForegroundColor Yellow
        Write-Host "Execute o PowerShell como Administrador ou libere a porta $Port manualmente." -ForegroundColor Yellow
    }
} else {
    Write-Host "Firewall: regra ja existe para porta $Port." -ForegroundColor DarkGray
}

$ips = Get-NetIPAddress -AddressFamily IPv4 |
    Where-Object { $_.InterfaceAlias -notmatch 'Loopback' -and $_.IPAddress -notmatch '^169\.254\.' } |
    Select-Object -ExpandProperty IPAddress

$wifiProfile = Get-NetConnectionProfile | Where-Object { $_.IPv4Connectivity -ne 'NoTraffic' } | Select-Object -First 1
if ($wifiProfile -and $wifiProfile.NetworkCategory -eq 'Public') {
    Write-Host ""
    Write-Host "AVISO: sua rede esta como PUBLICA. O Windows pode bloquear o celular." -ForegroundColor Red
    Write-Host "Va em Configuracoes > Rede e Internet > Wi-Fi > Propriedades > Perfil: Privado" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Imperium Barber - Servidor Local" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "PC:     http://localhost:$Port" -ForegroundColor Green
foreach ($ip in $ips) {
    Write-Host "Mobile: http://${ip}:$Port" -ForegroundColor Yellow
}
Write-Host ""
Write-Host "No celular:" -ForegroundColor White
Write-Host "  1. Conecte no MESMO Wi-Fi do PC (nao use dados moveis)" -ForegroundColor DarkGray
Write-Host "  2. Abra o navegador e digite o link Mobile acima" -ForegroundColor DarkGray
Write-Host "  3. Se nao abrir, desative VPN no celular" -ForegroundColor DarkGray
Write-Host ""
Write-Host "Pressione Ctrl+C para parar." -ForegroundColor DarkGray
Write-Host ""

Set-Location $projectRoot
python -m http.server $Port --bind 0.0.0.0
