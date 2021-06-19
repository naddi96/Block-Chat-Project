# Block-Chat-Project


 


## Istruzioni per avviare il progetto in locale (al fine di testing e sviluppo)

### Avviare ganache
avviare ganasche e assicurarsi che la porta sia la 8545. Importare qualche chiave privata di ganache su metamasck

### Fare il deploy dello smart-contract in locale su ganache
posizionarsi nella cartella ./smartcontract

`cd ./smartcontract`

se si sta lanciando il contratto per la prima volta installare le dipendenze con il comando 

`npm install`

lanciare il migrate sul nodo ganache

`truffle migrate --reset`


### Avviare il backend

posizionarsi nella cartella ./backend

`cd ./backend`

installare le dipendenza python `pip install -r requirements.txt` (potrebbe essere necessario il sudo o installarle una ad una)

lanciare il backed 

`python back.py`

### Avviare il fronted

posizionarsi nella cartella ./frontend

`cd ./frontend`


se si sta lanciando il frontend per la prima volta installare le dipendenze con il comando 

`npm install`

copiare il contratto compilato nel frontend

`rm -r ./frontend/src/build`

`cp  -r ./smartcontract/build/ ./frontend/src`

avviare il frontend

`npm start`


## Istruzioni per Deploy del progetto su architettura docker (con nodo etherium su un container docker)

Leggere il README nella cartella ./deploy


## Istruzioni per fare il deploy del contratto su rete Ropsten

posizionarsi nella cartella ./smartcontract

`cd ./smartcontract`

Se si sta lanciando il contratto per la prima volta installare le dipendenze con il comando 

`npm install`

Aprire il file `./truffle-config.js` e modificare le variabili `MNEMONIC` 
(con la chiave privata del proprio wollet) e `ETH_NODE` (con l'indirizzo che viene fornito da infuria quando si crea un nuovo progetto dovrebbe essere qualcosa in questa forma `https://ropsten.infura.io/v3/PROJECT_ID`)

A questo punto siamo pronti a fare il deploy sulla rete Rospen lanciado il comando 

`truffle deploy --network ropsten`

prima di eseguire il frontend  ricordarsi copiare il contratto compilato nella cartella ./frontend/src/build

`rm -r ./frontend/src/build`

`cp  -r ./smartcontract/build/ ./frontend/src`


## Istruzioni per Deploy del progetto su architettura docker (con contratto su Ropsten )

Fare il deploy del contratto su rete Ropsten seguendo le istruzioni nel punto precedente

Leggere il README nella cartella ./deploy-ropsten



