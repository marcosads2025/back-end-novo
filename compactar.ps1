# Criar pasta temporária
$tempFolder = "C:\temp\dog-api-deploy"
New-Item -ItemType Directory -Force -Path $tempFolder | Out-Null

# Copiar arquivos necessários
$exclude = @(
    "node_modules", 
    ".git", 
    ".gitignore", 
    ".vscode",
    "*.log",
    "*.zip",
    "*.ps1"
)

Get-ChildItem -Path . -Recurse | Where-Object {
    $include = $true
    foreach ($pattern in $exclude) {
        if ($_.FullName -like "*\$pattern" -or $_.FullName -like "*\$pattern\*") {
            $include = $false
            break
        }
    }
    return $include
} | Copy-Item -Destination {
    $path = $_.FullName.Replace((Get-Location).Path, $tempFolder)
    $dir = [System.IO.Path]::GetDirectoryName($path)
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }
    $path
} -Recurse -Force

# Compactar
$zipFile = "C:\temp\dog-api-deploy.zip"
if (Test-Path $zipFile) {
    Remove-Item $zipFile
}
Compress-Archive -Path "$tempFolder\*" -DestinationPath $zipFile -Force

# Limpar pasta temporária
Remove-Item -Recurse -Force $tempFolder

Write-Host "Arquivo ZIP criado em: $zipFile"
Write-Host "Tamanho do arquivo: $([math]::Round((Get-Item $zipFile).Length / 1MB, 2)) MB"
