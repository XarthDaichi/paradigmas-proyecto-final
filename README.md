# paradigmas-proyecto-final
Este es el repositorio para el desarrollo del proyecto final de Paradigmas de la Programación FS2023

## Instrucciones para correr el proyecto

1. cd osf-server
2. npm run build
    1. Si no corre en localhost/3000: Cambiar en "/osf-cliente/src/components/api/Url.js" la variable API_SERVER_URL al localhost donde le está corriendo. 
        - e.g. Si corre en localhost 3001 -> API_SERVER_URL = "http://localhost:3001/api"
3. En una terminal diferente, cd osf-cliente
4. npm run build

