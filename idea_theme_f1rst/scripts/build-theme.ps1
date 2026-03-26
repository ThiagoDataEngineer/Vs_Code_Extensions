param(
  [string]$Version = "0.3.0"
)

$ErrorActionPreference = "Stop"

$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$distDir = Join-Path $projectRoot "dist"
$tempDir = Join-Path $projectRoot ".build_temp"
$outputFile = Join-Path $distDir "idea-theme-f1rst-$Version.zip"
$pluginDirName = "idea-theme-f1rst"
$pluginJarName = "idea-theme-f1rst.jar"

if (Test-Path $tempDir) {
  Remove-Item -Recurse -Force $tempDir
}

if (!(Test-Path $distDir)) {
  New-Item -ItemType Directory -Path $distDir | Out-Null
}

$pluginRoot = Join-Path $tempDir $pluginDirName
$pluginLibDir = Join-Path $pluginRoot "lib"
$jarContentDir = Join-Path $tempDir "jar_content"
$jarFile = Join-Path $pluginLibDir $pluginJarName
$jarTempZip = Join-Path $tempDir "plugin-jar-temp.zip"

New-Item -ItemType Directory -Path $pluginLibDir -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $jarContentDir "META-INF") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $jarContentDir "theme") -Force | Out-Null

Copy-Item -Path (Join-Path $projectRoot "src/main/resources/META-INF/plugin.xml") -Destination (Join-Path $jarContentDir "META-INF/plugin.xml")
Copy-Item -Path (Join-Path $projectRoot "src/main/resources/theme/*") -Destination (Join-Path $jarContentDir "theme") -Recurse

Compress-Archive -Path (Join-Path $jarContentDir "*") -DestinationPath $jarTempZip
Move-Item -Path $jarTempZip -Destination $jarFile -Force

if (Test-Path $outputFile) {
  Remove-Item -Force $outputFile
}

Compress-Archive -Path $pluginRoot -DestinationPath $outputFile
Remove-Item -Recurse -Force $tempDir

Write-Host "Pacote criado em: $outputFile"
