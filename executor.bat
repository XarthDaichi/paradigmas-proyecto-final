@ECHO OFF
SET BASEDIR=%~dp0
call "%BASEDIR%reset.bat"
call "%BASEDIR%portFinder.bat"
call "%BASEDIR%osf_transpiler_server.bat"
call "%BASEDIR%osf_server.bat"
call "%BASEDIR%osf_cliente.bat"
:END
