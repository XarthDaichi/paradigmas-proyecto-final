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