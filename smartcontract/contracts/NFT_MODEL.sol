pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./BlockChat.sol";
contract NFT_MODEL is ERC721{
      BlockChat block_chat;

      struct nft_info{
            string nome_modello;
            uint256 last_id;
            address pub_key_creatore;
            uint256 minuti_blocco;
            uint limite_messaggi;
            uint limite_mint;
            uint256 costo;
            uint256 tempo_validita; //offset di secondi 
            uint256 timestamp_creation;

      }

      string nome_modello;
      uint256 last_id=0;
      address pub_key_creatore;
      uint256 minuti_blocco;
      uint limite_messaggi;
      uint limite_mint;
      uint256 costo;
      uint256 tempo_validita; //offset di secondi 
      uint256 timestamp_creation;

      mapping (uint256 => string) primo_mex;
      mapping (uint256  => bool ) vip_riposta;
      mapping (uint256  => bool ) reclamo_fatto;

      constructor(string memory nome_modello1,
                        address pub_key_creatore1,
                        uint256   minuti_blocco1,
                        uint  limite_messaggi1,
                        uint      limite_mint1,
                        uint256      tempo_validita1,
                        uint256  costo1,
                        address block_chat_address
                        ) ERC721("CreatorChat","BlockChat") {
             
            nome_modello=nome_modello1;
            pub_key_creatore=pub_key_creatore1;
            minuti_blocco=minuti_blocco1;
            costo=costo1;
            limite_messaggi=limite_messaggi1;
            limite_mint=limite_mint1;
            tempo_validita=tempo_validita1;
            block_chat=BlockChat(block_chat_address);
            timestamp_creation= block.timestamp;
      }

      function _beforeTokenTransfer(address from, address to, uint256 amount)
            internal virtual override // Add virtual here!
      {
            super._beforeTokenTransfer(from, to, amount); // Call parent hook
            if (from != address(0) && to != address(0)){           
                  block_chat.removeNftComprati(from,address(this),amount);
                  block_chat.addNftComprati(to,address(this),amount,nome_modello);
            }
      }

      function compare(string memory _s1, string memory _s2)
            pure
            internal
            returns(bool) {
              bytes memory b1 = bytes(_s1);
              bytes memory b2 = bytes(_s2);
              if (b1.length != b2.length) {
                return false;
              }
              return keccak256(b1) == keccak256(b2);
  }

      //caller: possessore nft (non creatore)
      function reclamo(uint256 id) public {
            require(ownerOf(id) == msg.sender,"nft non tuo");
            require(tempo_validita + timestamp_creation < block.timestamp,"troppo presto per chiedere reclamo");
            require(vip_riposta[id]==false,"il vip ha risposto");
            require(reclamo_fatto[id]==false, "hai gia fatto il reclamo");
            reclamo_fatto[id]=true;
            address payable utente= payable(msg.sender);
            utente.transfer(costo);
      }

      //caller: creatore del nft
      function confermaRisposta(uint256 id,string memory mex_utente) public{
            require(pub_key_creatore== msg.sender,"modello nft non tuo");
            require( tempo_validita + timestamp_creation > block.timestamp,"tempo per rispondere al messaggio scaduto");
            
            //check lettura
            require(compare(mex_utente,primo_mex[id]), "i messaggi non corrispondono" );

            require(vip_riposta[id]==false,"hai gia ritirato questo nft");
            //fai transazione a favore del vip
            address payable vip= payable(msg.sender);
            vip.transfer(costo);
            vip_riposta[id]=true;
      }


      function compraNft(string  memory mex) public payable{
            require(msg.sender != pub_key_creatore,"non puoi comprare un nft creato da te stesso");

            if(limite_mint != 0){
                  require(last_id < limite_mint,"nft terminati");
            }
            require( tempo_validita + timestamp_creation > block.timestamp,"tempo per comprare nft scaduto");
      //invia soldi al contratto
      //id_to_proprietario[last_id]=msg.sender;
      //timestamp_mint[last_id]= now;
            require( msg.value == costo,"NON HAI I SORDI, SEI N PORACCIO.");
            last_id = last_id+1;
            primo_mex[last_id] = mex;
            //adress_to_id_contract(msg.sender,address(this) ,last_id )

            block_chat.addNftComprati(msg.sender,address(this),last_id,nome_modello);
            _mint(msg.sender, last_id);

            }

        function getNftInfo()public view returns ( nft_info memory){
            nft_info memory nft= nft_info(nome_modello,
                    last_id,
                    pub_key_creatore,
                    minuti_blocco,
                    limite_messaggi,
                    limite_mint,
                    costo,
                    tempo_validita,
                    timestamp_creation);
            return nft;
    }



        function getVipRiposta(uint256 id)public view returns ( bool){
                return vip_riposta[id];
        }

        function getReclamoFatto(uint256 id)public view returns ( bool){
                return reclamo_fatto[id];
        }


      function getPrimoMex(uint256 id)public view returns (string memory ){
            return primo_mex[id];
      }
 /*
    mapping (uint256 => uint256) prezzo;

        function changePrezzo(uint256 idtoken,uint256 nuovo_prezzo) public {
            require(prezzo[idtoken]>0,"L'oggetto non in vendita");
            require(msg.sender == ownerOf(idtoken),"Non sei il proprietario");
            prezzo[idtoken]=nuovo_prezzo;
            }
            
        function setForSale(uint256 _tokenId,uint256 prezzoVendita) public{
            address owner = ownerOf(_tokenId);
            //il prezzo del token non deve essere 0(mai stato settato) e il sender deve
            //essere il proprietario del token
            require(prezzo[_tokenId]==0);
            require(owner == msg.sender);
            prezzo[_tokenId]=prezzoVendita;
            //esegue l'approval della chiave del contratto, permettendo a quest ultimo
            //di accedere ai token ed effettuare modifiche
        }

            //Funzione che effettua lo scambio tra il token e il prezzo in Wei
        function buy(uint256 _tokenId) public  payable {
            address buyer = msg.sender;
            uint256 payedPrice = msg.value;
            //proprietario del token
            address ownerA =ownerOf(_tokenId);
            //payable permette all'owner del token di ricevere i token dal buyer
            address payable owner= payable(ownerA);
            require(prezzo[_tokenId]>0,"OPERA NON IN VENDITA.");
            require(payedPrice == prezzo[_tokenId],"PREZZO TRASFERITO NON CORRETTO");
            //effettua la transazione in Wei
            owner.transfer(prezzo[_tokenId]);
            //cambia il proprietario del token
            _transfer(owner,buyer,_tokenId);
            //venduto il token, viene rimosso dagli oggetti in vendita
            prezzo[_tokenId]=0;
        }

        function getInVenditaList()view public returns ( uint256 [] memory){
            uint256  [] memory nft_invendita_list= new uint256[](last_id);
            uint256 last_inserted_position=0;
            for (uint256 i=0; i< last_id;i++){
                if (prezzo[i+1]>0){
                        nft_invendita_list[last_inserted_position]=i+1;
                        last_inserted_position++;
                }
            }
            return nft_invendita_list;

        }

        function getPrezzo(uint256 _tokenId) view public returns (uint256){
            return prezzo[_tokenId];
        }





    */
/*

                  function getTimestampDeadline()public view returns ( uint256){
      return timestamp_creation+tempo_validita;
            }
            function getTimestampCreation()public view returns ( uint256){
                  return timestamp_creation;
            }




            function getTempoValidita()public view returns (uint){
                  return tempo_validita;
            }

            function getLimiteMex()public view returns (uint){
                  return limite_messaggi;
            }

            function getLimiteMint()public view returns (uint){
                  return limite_mint;
            }
            function getCreatore()public view returns (address){
                  return pub_key_creatore;
            }


            function getNome() public view  returns ( string memory) {
                  return nome_modello;

            }


            function getLastId() public view returns (uint256){
                  return last_id;
            }


            function getMinutiBlocco()public view returns (uint256){
                  return minuti_blocco;
            }


            function getCosto()public view returns (uint256){
                  return costo;
            }

*/
      }
