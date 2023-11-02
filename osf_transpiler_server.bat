cd osf-transpiler-server
echo Setting Port to %swiplport%

echo getSwiplPort('%swiplport%'). >> port.pl
echo getNextPort('http://localhost:%nextport%'). >> port.pl

echo Starting Transpiler Server
start swipl -s simple_service_server.pl
cd ..