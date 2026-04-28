@echo off
setlocal

set APP_HOME=%~dp0
set PROPERTIES_FILE=%APP_HOME%gradle\wrapper\gradle-wrapper.properties

if not exist "%PROPERTIES_FILE%" (
  echo Missing Gradle wrapper properties: %PROPERTIES_FILE%
  exit /b 1
)

for /f "tokens=2 delims==" %%A in ('findstr /b "distributionUrl=" "%PROPERTIES_FILE%"') do set DISTRIBUTION_URL=%%A
set DISTRIBUTION_URL=%DISTRIBUTION_URL:\:=:%

for %%A in ("%DISTRIBUTION_URL%") do set ZIP_NAME=%%~nxA
set DIST_NAME=%ZIP_NAME:.zip=%
if "%GRADLE_USER_HOME%"=="" set GRADLE_USER_HOME=%USERPROFILE%\.gradle
set DIST_DIR=%GRADLE_USER_HOME%\wrapper\dists\%DIST_NAME%
set GRADLE_BIN=%DIST_DIR%\%DIST_NAME%\bin\gradle.bat
set ZIP_FILE=%DIST_DIR%\%ZIP_NAME%

if not exist "%GRADLE_BIN%" (
  mkdir "%DIST_DIR%" 2>nul
  powershell -NoProfile -ExecutionPolicy Bypass -Command "[Net.ServicePointManager]::SecurityProtocol=[Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri '%DISTRIBUTION_URL%' -OutFile '%ZIP_FILE%'"
  powershell -NoProfile -ExecutionPolicy Bypass -Command "Expand-Archive -Path '%ZIP_FILE%' -DestinationPath '%DIST_DIR%' -Force"
)

call "%GRADLE_BIN%" %*
