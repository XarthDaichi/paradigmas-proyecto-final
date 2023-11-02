cls
@ECHO OFF
call reset.bat
set /a swiplport = 7999
cd osf-transpiler-server
echo Checking for Available Ports for Prolog
:loopswipl
set /a swiplport += 1
netstat -a -n -o | findstr "LISTENING" | findstr "%swiplport%" >nul 2>nul

if %swiplport% equ 65535 goto END

if %ERRORLEVEL% equ 0 goto loopswipl

goto SWIPLFOUND

:SWIPLFOUND

echo Checking for Available Ports for Next
set /a nextport = 2999
:loopnext
set /A nextport += 1
netstat -a -n -o | findstr "LISTENING" | findstr "%nextport%" >nul 2>nul

if %nextport% equ 8000 goto END

if %ERRORLEVEL% equ 0 goto loopnext

goto NEXTFOUND

:NEXTFOUND

echo Checking for Available Ports for React
set /a reactport = %nextport%
if %reactport% geq 8000 goto END
:loopreact
set /A reactport += 1
netstat -a -n -o | findstr "LISTENING" | findstr "%reactport%" >nul 2>nul

if %reactport% geq 8080 goto END

if %ERRORLEVEL% equ 0 goto loopreact

goto REACTFOUND

:REACTFOUND

echo Setting Port to %swiplport%

echo getSwiplPort('%swiplport%'). >> port.pl
echo getNextPort('http://localhost:%nextport%'). >> port.pl

echo Starting Transpiler Server
start swipl -s simple_service_server.pl
cd ..


cd osf-server
echo Installing Client Node_Modules.....
call npm install

echo Setting Next Port to %nextport%

echo Editing .env.local variables for NEXT
echo PORT = %nextport% >> .env.local
echo SWIPLPORT = %swiplport% >> .env.local
echo REACTPORT = %reactport% >> .env.local

echo Building Server.....
call npm run build

echo Starting Server.....
start npm run start -- -p %nextport%
cd ..
cd osf-cliente
echo Installing Client Node_Modules.....
call npm install

echo Setting React Port to %nextport%
echo Editing .env.local variables for REACT
echo PORT = %reactport% >> .env.local
echo REACT_APP_NEXTPORT = %nextport% >> .env.local

echo Building Client.....
call npm run build
echo Starting Client.....
start npm start
:END
cd ..
