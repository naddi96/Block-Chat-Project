pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";




contract NFT_MODEL{

      uint256 id=0;
      string nome_modello;
      address pub_key_creatore;
      uint256 minuti_blocco;
      uint limite_messaggi;
      uint256 costo;
      bool garanzia_risposta;

      mapping (uint256 id)
      constructor(string memory nome_modello1,
                        address pub_key_creatore1,
                        uint256   minuti_blocco1,
                           uint  limite_messaggi1,
                        uint256  costo1,
                        bool  garanzia_risposta1) {
            
            nome_modello=nome_modello1;
            pub_key_creatore=pub_key_creatore1;
            minuti_blocco=minuti_blocco1;
            costo=costo1;
            limite_messaggi=limite_messaggi1;
            garanzia_risposta=garanzia_risposta1;
      }

}





contract BlockChat is ERC721{

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

mapping (NFT_MODEL => address ) model_to_creator; 

mapping (NFT_MODEL => string [] ) mex_list;


constructor() ERC721("CreatorChat","BlockChat") {}

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

    require(model_to_creator[nft]==address(0),"model already exist");
    creator_nft_list[msg.sender].push(nft);
    model_to_creator[nft]=msg.sender;
}



//function compraNft(){}









}
