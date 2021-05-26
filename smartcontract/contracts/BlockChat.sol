pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract NFT_MODEL is ERC721{
      string nome_modello;
      uint256 last_id=0;
      address pub_key_creatore;
      uint256 minuti_blocco;
      uint limite_messaggi;
      uint limite_mint;
      uint256 costo;
      uint256 tempo_validita; //offset di secondi 
      uint256 timestamp_creation;
      bool garanzia_risposta;

      mapping (uint256 => string) primo_mex;
      mapping (uint256  => bool ) vip_riposta;
      
      constructor(string memory nome_modello1,
                        address pub_key_creatore1,
                        uint256   minuti_blocco1,
                        uint  limite_messaggi1,
                        uint      limite_mint1,
                        uint256      tempo_validita1,
                        uint256  costo1,
                        bool  garanzia_risposta1) ERC721("CreatorChat","BlockChat") {
             
            nome_modello=nome_modello1;
            pub_key_creatore=pub_key_creatore1;
            minuti_blocco=minuti_blocco1;
            costo=costo1;
            limite_messaggi=limite_messaggi1;
            limite_mint=limite_mint1;
            tempo_validita=tempo_validita1;
            garanzia_risposta=garanzia_risposta1;
            timestamp_creation= block.timestamp;
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
      if(limite_mint != 0){
            require(last_id < limite_mint,"nft terminati");
      }
      require( tempo_validita + timestamp_creation > block.timestamp,"tempo per comprare nft scaduto");
    //invia soldi al contratto
    //id_to_proprietario[last_id]=msg.sender;
    //timestamp_mint[last_id]= now;
      uint256 payedPrice = msg.value;
      require(payedPrice == costo,"NON HAI I SORDI, SEI N PORACCIO.");
      last_id = last_id+1;
      primo_mex[last_id] = mex;
      _mint(msg.sender, last_id);
}

function getVipRiposta(uint256 id)public view returns ( bool){
      return vip_riposta[id];
}


function getTimestampDeadline()public view returns ( uint256){
      return timestamp_creation+tempo_validita;
}
function getTimestampCreation()public view returns ( uint256){
      return timestamp_creation;
}

function getPrimoMex(uint256 id)public view returns (string memory ){
      return primo_mex[id];
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



function getGaranziaRisposta()public view returns (bool){
      return garanzia_risposta;
}




}

contract BlockChat {

mapping (bytes => address) combkey_to_creator; //abi.encodePacked(msg.sender,nome_modello)


event  ModelloNftCreato(address indexed _from,
                        NFT_MODEL indirizzo_contratto,
                        string  nome_modello,
                        uint256 minuti_blocco,
                        uint limite_messaggi,
                        uint256 costo,
                        bool garanzia_risposta);

function creaModelloNft(string memory nome_modello,
                        uint256 minuti_blocco,
                        uint limite_messaggi,
                        uint limite_mint,
                        uint256 tempo_validita,
                        uint256 costo,
                        bool garanzia_risposta) public{

    
    NFT_MODEL nft = new NFT_MODEL(
                                    nome_modello,
                                    msg.sender,
                                    minuti_blocco,
                                    limite_messaggi,
                                    limite_mint,
                                    tempo_validita,
                                    costo,
                                    garanzia_risposta);


    //combinazione due chiavi
    bytes memory compKey = abi.encodePacked(msg.sender, bytes(nome_modello));
    require(combkey_to_creator[compKey]==address(0),"model already exist");
    combkey_to_creator[compKey]=msg.sender;
    emit ModelloNftCreato(msg.sender,
                          nft,
                          nome_modello,
                              minuti_blocco,
                              limite_messaggi,
                              costo,
                              garanzia_risposta);


}

/*
function getNFTlist() public view returns (NFT_MODEL [] memory) {
      return nft_list;
}*/

/*
function getNFTcreatore(address creatore) public view returns (NFT_MODEL [] memory) {
      return creator_nft_list[creatore];
}*/



}







