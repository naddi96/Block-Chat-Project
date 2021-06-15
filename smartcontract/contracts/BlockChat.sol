pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract NFT_MODEL is ERC721{
      BlockChat block_chat;
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
      uint256 payedPrice = msg.value;
      require(payedPrice == costo,"NON HAI I SORDI, SEI N PORACCIO.");
      last_id = last_id+1;
      primo_mex[last_id] = mex;
      //adress_to_id_contract(msg.sender,address(this) ,last_id )

      block_chat.addNftComprati(msg.sender,address(this),last_id,nome_modello);
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


/*
function getGaranziaRisposta()public view returns (bool){
      return garanzia_risposta;
}*/




}

contract BlockChat {


struct id_nft {
      uint256 id;
      address nft_contract;
      string nome;

}


mapping (address => id_nft []) address_to_id_nft;
mapping (address => address) nft_address_to_creator;

mapping (bytes => address) combkey_to_creator; //abi.encodePacked(msg.sender,nome_modello)






function addNftComprati(address buyer,address nft_contr,uint256 id,string memory nome ) public  {
     require( nft_address_to_creator[msg.sender] != address(0),"operazione negata");
     id_nft memory item  = id_nft(id,nft_contr,nome);
     
     address_to_id_nft[buyer].push(item);
}

function removeNftComprati(address seller,address nft_contr,uint256 id ) public {
      require( nft_address_to_creator[msg.sender] != address(0),"operazione negata");
      uint256 len=address_to_id_nft[seller].length;
      for (uint256 i=0;i<len;i++ ){
				if (address_to_id_nft[seller][i].id == id && 
                        address_to_id_nft[seller][i].nft_contract == nft_contr ){
					while (i<address_to_id_nft[seller].length-1) {
						address_to_id_nft[seller][i] = address_to_id_nft[seller][i+1];
						i++;
						}
					address_to_id_nft[seller].pop();
				}
			}
}





function getNftComprati(address addr)  public view returns (id_nft [] memory) {
      return address_to_id_nft[addr];
}


event  ModelloNftCreato(address indexed _from,
                        NFT_MODEL indirizzo_contratto,
                        string  nome_modello,
                        uint256 minuti_blocco,
                        uint limite_messaggi,
                        uint256 costo);

function creaModelloNft(string memory nome_modello,
                        uint256 minuti_blocco,
                        uint limite_messaggi,
                        uint limite_mint,
                        uint256 tempo_validita,
                        uint256 costo) public{

    
    NFT_MODEL nft = new NFT_MODEL(
                                    nome_modello,
                                    msg.sender,
                                    minuti_blocco,
                                    limite_messaggi,
                                    limite_mint,
                                    tempo_validita,
                                    costo,
                                    address(this)
                                    );


    //combinazione due chiavi
    bytes memory compKey = abi.encodePacked(msg.sender, bytes(nome_modello));
    require(combkey_to_creator[compKey]==address(0),"model already exist");
    combkey_to_creator[compKey]=msg.sender;
    nft_address_to_creator[address(nft)]= msg.sender;
    emit ModelloNftCreato(msg.sender,
                          nft,
                          nome_modello,
                              minuti_blocco,
                              limite_messaggi,
                              costo
                              );


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







