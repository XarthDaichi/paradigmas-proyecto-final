set /a swiplport = 7999
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