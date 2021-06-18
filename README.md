# Block-Chat-Project

## Istruzioni per avviare il progetto in locale

### Avviare ganache
avviare ganasche e assicurarsi che la porta sia la 8545. Importare qualche chiave privata di ganache su metamasck

### Fare il deploy dello smart-contract
posizionarsi nella cartella ./frontend

`cd ./frontend`

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