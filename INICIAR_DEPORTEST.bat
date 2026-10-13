@echo off
title DEPORTEST PRO - Servidor Local
echo ========================================================
echo         DEPORTEST PRO - INICIANDO SERVIDOR LOCAL
echo ========================================================
echo.
echo El servidor se mantendra activo todo el dia mientras esta ventana este abierta.
echo.
cd /d "%~dp0"
echo Abriendo aplicacion en el navegador...
start http://localhost:3000
echo Iniciando proceso Node/Vite...
npm run dev
pause
