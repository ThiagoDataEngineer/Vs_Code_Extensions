param(
  [string]$Version = "0.4.0"
)

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

function New-ZipFromDirectory {
  param(
    [Parameter(Mandatory = $true)][string]$SourceDir,
    [Parameter(Mandatory = $true)][string]$DestinationFile
  )

  if (Test-Path $DestinationFile) {
    Remove-Item -Force $DestinationFile
  }

  $sourceRoot = (Resolve-Path $SourceDir).Path
  $archive = [System.IO.Compression.ZipFile]::Open($DestinationFile, [System.IO.Compression.ZipArchiveMode]::Create)

  try {
    $files = Get-ChildItem -Path $sourceRoot -Recurse -File
    foreach ($file in $files) {
      $relative = $file.FullName.Substring($sourceRoot.Length).TrimStart([char[]]@([char]92, [char]47))
      $entryName = $relative -replace '\\', '/'
      [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
        $archive,
        $file.FullName,
        $entryName,
        [System.IO.Compression.CompressionLevel]::Optimal
      ) | Out-Null
    }
  }
  finally {
    $archive.Dispose()
  }
}

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

New-Item -ItemType Directory -Path $pluginLibDir -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $jarContentDir "META-INF") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $jarContentDir "theme") -Force | Out-Null

Copy-Item -Path (Join-Path $projectRoot "src/main/resources/META-INF/plugin.xml") -Destination (Join-Path $jarContentDir "META-INF/plugin.xml")
Copy-Item -Path (Join-Path $projectRoot "src/main/resources/theme/*") -Destination (Join-Path $jarContentDir "theme") -Recurse

New-ZipFromDirectory -SourceDir $jarContentDir -DestinationFile $jarFile
Remove-Item -Recurse -Force $jarContentDir

if (Test-Path $outputFile) {
  Remove-Item -Force $outputFile
}

New-ZipFromDirectory -SourceDir $tempDir -DestinationFile $outputFile
Remove-Item -Recurse -Force $tempDir

Write-Host "Pacote criado em: $outputFile"
