param(
  [string]$Version = "0.2.0"
)

$ErrorActionPreference = "Stop"

$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$distDir = Join-Path $projectRoot "dist"
$tempDir = Join-Path $projectRoot ".build_temp"
$outputFile = Join-Path $distDir "idea-theme-f1rst-$Version.zip"

if (Test-Path $tempDir) {
  Remove-Item -Recurse -Force $tempDir
}

if (!(Test-Path $distDir)) {
  New-Item -ItemType Directory -Path $distDir | Out-Null
}

New-Item -ItemType Directory -Path (Join-Path $tempDir "META-INF") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $tempDir "theme") -Force | Out-Null

Copy-Item -Path (Join-Path $projectRoot "src/main/resources/META-INF/plugin.xml") -Destination (Join-Path $tempDir "META-INF/plugin.xml")
Copy-Item -Path (Join-Path $projectRoot "src/main/resources/theme/*") -Destination (Join-Path $tempDir "theme") -Recurse

if (Test-Path $outputFile) {
  Remove-Item -Force $outputFile
}

Compress-Archive -Path (Join-Path $tempDir "*") -DestinationPath $outputFile
Remove-Item -Recurse -Force $tempDir

Write-Host "Pacote criado em: $outputFile"
