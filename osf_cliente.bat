cd osf-cliente
echo Installing Client Node_Modules.....
call npm install

echo Building Client.....
call npm run build
echo Starting Client.....
start npm start
cd ..