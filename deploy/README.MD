# istruzioni per eseguire il deploy su architettura docker (con rete su container docker)


## deploy del contratto sulla rete etherium nel conteiner docker

posizionamoci nella cartella `cd ./deploy` lanciamo `docker-compose up`  e una volta che tutti i container saranno inizializzati 

su un altro terminale posizionarsi nella cartella `cd ./smarcontract` e dare il comndo 

`truffle migrate --reset`

## Copia del contrattto nel frontend

copiare la cartella /smartcontract/build in /frontend/src/

`rm -rf ./frontend/src/build `

`cp -r ./smartcontract/build/ ./frontend/src/`

## Copia del frontend nell'ambiente di deploy

copiare la cartella /frontend  in /ropsten/nginx-config-cert/

`rm -rf ./deploy/nginx-config-cert/frontend`

`cp -r ./frontend  ./deploy/nginx-config-cert/`

## Impostazione dell'endpoint del backend nel frontend

posiziarsi nella cartella  ./deploy/nginx-config-cert/frontend

`cd ./deploy/nginx-config-cert/frontend`

cambiare il parametro api_endpoint in  `./deploy/nginx-config-cert/frontend/src/config.json` con il dominio utilizzato nel proprio server


## Compilazione del frontend

ed eseguire il comando (de da errori di dipendenze mandare npm install) 

`npm run build`


## Impostazione del blockchain endpoint nel file configurazione del backend

cambiare  il parametro  `blockchain_endpoint`   nel file `./deploy/backend_config/config.json` con l'endpoint della rete ethetium all'interno della rete docker  http://node:8545
"blockchain_endpoint":"http://node:8545",

## avvio della applicazione

adesso lanciamo `docker-compose up` 