SET BASEDIR=%~dp0
cd "%BASEDIR% osf-transpiler-server"

echo Starting Transpiler Server
start swipl -s simple_service_server.pl
cd "%BASEDIR%"