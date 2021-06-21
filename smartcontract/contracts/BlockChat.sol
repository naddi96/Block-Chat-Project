// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NFT_MODEL.sol";



contract BlockChat {


      struct id_nft {
            uint256 id;
            address nft_contract;
            string nome;

      }


      mapping (address => id_nft []) address_to_id_nft;
      mapping (address => address) nft_address_to_creator;
      mapping (bytes => address) combkey_to_creator; //abi.encodePacked(msg.sender,nome_modello)

      address private owner;

      
      constructor()  {
            owner = msg.sender; // Whoever deploys smart contract becomes the owner
      }



      function addNftComprati(address buyer,address nft_contr,uint256 id,string memory nome ) public  {
            require( nft_address_to_creator[msg.sender] != address(0),"operazione negata"); 
            address_to_id_nft[buyer].push( id_nft(id,nft_contr,nome));
      }

      function removeNftComprati(address seller,address nft_contr,uint256 id ) public {
            require( nft_address_to_creator[msg.sender] != address(0),"operazione negata");
            for (uint256 i=0;i<address_to_id_nft[seller].length;i++ ){
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
                              uint256 costo) public payable{

            

            uint256  guadagno_massimo=(costo - ((costo* 5 / 100 ) )) * limite_mint;
            uint256 final_price=(costo/3) + ((costo * (tempo_validita/60 /60 /24 ))  / 100);
            
            require(
                  msg.value >= final_price &&
                  costo>100000000000000 &&
                  tempo_validita>0,'parametri inseriti non validi costo troppo basso o tempo_validita negativo');
            
            if (guadagno_massimo !=0 ){
                  require(final_price < guadagno_massimo,"prezzo creazione nft maggiore del possibile guadagno" );
            }

            NFT_MODEL nft = new NFT_MODEL(
                                          nome_modello,
                                          msg.sender,
                                          minuti_blocco,
                                          limite_messaggi,
                                          limite_mint,
                                          tempo_validita,
                                          costo,
                                          address(this),
                                          owner
                                          );

            
            //combinazione due chiavi
            bytes memory compKey = abi.encodePacked(msg.sender, bytes(nome_modello));
            require(combkey_to_creator[compKey]==address(0),"model already exist");
            combkey_to_creator[compKey]=msg.sender;
            nft_address_to_creator[address(nft)]= msg.sender;
            payable(owner).transfer(final_price);
            
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







