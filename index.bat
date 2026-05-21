@echo off
setlocal

set "APP_DIR=%~dp0"
set "HTML_FILE=%APP_DIR%index.html"

if not exist "%HTML_FILE%" (
  echo Cannot find index.html in:
  echo %APP_DIR%
  pause
  exit /b 1
)

start "" "%HTML_FILE%"
endlocal
