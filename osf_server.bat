cd osf-server
echo Installing Client Node_Modules.....
call npm install

echo Building Server.....
call npm run build

echo Starting Server.....
start npm run start -- -p %nextport%
cd ..