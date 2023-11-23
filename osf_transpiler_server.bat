SET BASEDIR=%~dp0
cd "%BASEDIR%osf-transpiler-server"

echo Starting Transpiler Server
start swipl -s %BASEDIR%osf-transpiler-server\simple_service_server.pl
cd "%BASEDIR%"