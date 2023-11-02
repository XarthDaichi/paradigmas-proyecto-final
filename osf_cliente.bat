cd osf-cliente
echo Installing Client Node_Modules.....
call npm install

echo Setting React Port to %reactport%
echo Editing .env.local variables for REACT
echo PORT = %reactport% >> .env.local
echo REACT_APP_NEXTPORT = %nextport% >> .env.local

echo Building Client.....
call npm run build
echo Starting Client.....
start npm start
cd ..