@echo off
echo ========================================
echo    BrizPickr NX Monorepo Quick Start
echo ========================================
echo.

echo [1/4] Checking Node.js version...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo [2/4] Installing NX CLI globally...
npm install -g nx
if %errorlevel% neq 0 (
    echo ERROR: Failed to install NX CLI!
    pause
    exit /b 1
)

echo.
echo [3/4] Installing project dependencies...
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo [4/4] Starting Customer Dashboard...
echo.
echo 🚀 Opening http://localhost:4200 in your browser...
echo.
echo Press Ctrl+C to stop the server
echo.

nx serve customer-dashboard

pause 