@echo off
cd osf-server
echo MONGODB_URI = mongodb+srv://root:root@cluster0.v7rgr02.mongodb.net/?retryWrites=true^&w=majority > .env.local

cd ..
cd osf-cliente
echo. > .env.local
cd ..