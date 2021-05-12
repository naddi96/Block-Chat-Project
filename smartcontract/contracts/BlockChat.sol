pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";




contract NFT_MODEL is ERC721{
      string nome_modello;
      uint256 last_id=0;
      //address pub_key_creatore;
      uint256 minuti_blocco;
      uint limite_messaggi;
      uint256 costo;
      bool garanzia_risposta;
      mapping (uint256  =>address ) id_to_proprietario;
      mapping (uint256  =>string [] ) mex_list;

      constructor(string memory nome_modello1,
                        address pub_key_creatore1,
                        uint256   minuti_blocco1,
                           uint  limite_messaggi1,
                        uint256  costo1,
                        bool  garanzia_risposta1) ERC721("CreatorChat","BlockChat") {
             
            nome_modello=nome_modello1;
            id_to_proprietario[0]=pub_key_creatore1;
            minuti_blocco=minuti_blocco1;
            costo=costo1;
            limite_messaggi=limite_messaggi1;
            garanzia_risposta=garanzia_risposta1;
      }

/*
      setIdProp(address sender){
      last_id = last_id+1;
      id_to_proprietario[last_id]=sender;
      }
*/



function compraNft() public{
    last_id = last_id+1;
    id_to_proprietario[last_id]=msg.sender;
    _mint(msg.sender, last_id);
}


//getters
function getPropretarioFromId(uint256 id)public view returns (address){
      return id_to_proprietario[id];
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

/*
struct NFT_MODEL {
      uint256 id;
      string nome_modello;
      address pub_key_creatore;
      uint256 minuti_blocco;
      uint limite_messaggi;
      uint256 costo;
      bool garanzia_risposta;
}
*/
mapping (address => NFT_MODEL []) creator_nft_list;
mapping (bytes => address) combkey_to_creator; //abi.encodePacked(msg.sender,nome_modello)
NFT_MODEL [] nft_list;
//mapping (NFT_MODEL => string [] ) mex_list;

function creaModelloNft(string memory nome_modello,
                        uint256 minuti_blocco,
                        uint limite_messaggi,
                        uint256 costo,
                        bool garanzia_risposta) public{

    
    NFT_MODEL nft = new NFT_MODEL(
                                    nome_modello,
                                    msg.sender,
                                    minuti_blocco,
                                    limite_messaggi,
                                    costo,
                                    garanzia_risposta);


    //combinazione due chiavi
    bytes memory compKey = abi.encodePacked(msg.sender, bytes(nome_modello));
    require(combkey_to_creator[compKey]==address(0),"model already exist");
    creator_nft_list[msg.sender].push(nft);
    combkey_to_creator[compKey]=msg.sender;
    nft_list.push(nft);
}


function getNFTlist() public view returns (NFT_MODEL [] memory) {
      return nft_list;
}


function getNFTcreatore(address creatore) public view returns (NFT_MODEL [] memory) {
      return creator_nft_list[creatore];
}



}







