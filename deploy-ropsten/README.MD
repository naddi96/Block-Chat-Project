# istruzioni per eseguire il deploy

## Seguire queste istruzioni dopo aver fatto il deploy del contratto su ropsten 

## Copia del contrattto nel frontend

copiare la cartella /smartcontract/build in /frontend/src/

`rm -rf ./frontend/src/build `

`cp -r ./smartcontract/build/ ./frontend/src/`

## Copia del frontend nell'ambiente di deploy

copiare la cartella /frontend  in /deploy-ropsten/nginx-config-cert/

`rm -rf ./deploy-ropsten/nginx-config-cert/frontend`

`cp -r ./frontend  ./deploy-ropsten/nginx-config-cert/`

## Impostazione dell'endpoint del backend nel frontend

posiziarsi nella cartella  ./deploy-ropsten/nginx-config-cert/frontend

`cd ./deploy-ropsten/nginx-config-cert/frontend`

cambiare il parametro api_endpoint in  `./deploy-ropsten/nginx-config-cert/frontend/src/config.json` con il dominio utilizzato nel proprio server

## Compilazione del frontend

ed eseguire il comando (de da errori di dipendenze mandare npm install) 

`npm run build`


## Impostazione del blockchain endpoint nel file configurazione del backend

cambiare  il parametro  blockchain_endpoint   nel file `./deploy/backend_config/config.json` con l'endpoint rilasciato da infura (lo stesso usato nello smartcontract) 
"blockchain_endpoint":"`https://ropsten.infura.io/v3/PROJECT_ID`"

## avvio della applicazione

adesso lanciamo `docker-compose up` sempre nella cartella ./deploy





