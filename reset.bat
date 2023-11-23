@echo off
SET BASEDIR=%~dp0
cd %BASEDIR%osf-transpiler-server
echo.> port.pl
cd %BASEDIR%

cd %BASEDIR%osf-server
echo MONGODB_URI = mongodb+srv://root:root@cluster0.v7rgr02.mongodb.net/?retryWrites=true^&w=majority > .env.local
cd %BASEDIR%

cd %BASEDIR%osf-cliente
echo.> .env.local
cd %BASEDIR%