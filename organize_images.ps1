# Script de organização de imagens para projeto de barbearia
# Executar: .\organize_images.ps1

# Criar estrutura de pastas
$folders = @(
    "assets/images/hero",
    "assets/images/gallery", 
    "assets/images/services",
    "assets/images/team",
    "assets/icons",
    "assets/fonts",
    "src/components",
    "src/pages", 
    "src/styles",
    "src/utils",
    "docs/requirements",
    "docs/designs",
    "public"
)

foreach ($folder in $folders) {
    if (!(Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force
        Write-Host "✅ Pasta criada: $folder" -ForegroundColor Green
    }
}

# Mover e renomear imagens baseado no tamanho (heurística simples)
$images = Get-ChildItem -Filter "*.jpg"

foreach ($img in $images) {
    $sizeMB = [math]::Round($img.Length / 1MB, 2)
    
    if ($sizeMB -gt 0.09) {
        # Imagens grandes -> gallery
        $newName = "gallery-barber-$(Get-Random -Minimum 1000 -Maximum 9999).jpg"
        $dest = "assets/images/gallery/$newName"
    }
    elseif ($sizeMB -gt 0.07) {
        # Imagens médias -> services  
        $newName = "service-$(Get-Random -Minimum 1000 -Maximum 9999).jpg"
        $dest = "assets/images/services/$newName"
    }
    else {
        # Imagens pequenas -> team/icons
        $newName = "team-member-$(Get-Random -Minimum 1000 -Maximum 9999).jpg"
        $dest = "assets/images/team/$newName"
    }
    
    Move-Item $img.Name $dest
    Write-Host "📁 Movido: $($img.Name) -> $dest" -ForegroundColor Yellow
}

Write-Host "🎯 Organização concluída!" -ForegroundColor Cyan
Write-Host "Estrutura criada com padrões profissionais" -ForegroundColor White