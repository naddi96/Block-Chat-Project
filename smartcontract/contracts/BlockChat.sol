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

/*

uint256 constant USD_to_Wei = 430560661472170;
msg.value;
uint256 costoVero = calcolaCosto(limite_messaggi, minuti_blocco, tempo_validita);
require(msg.value == 10000000000,"Il costo della creazione non coincide con il mio pene.");

function log2(uint x) public returns (uint y){
   assembly {
        let arg := x
        x := sub(x,1)
        x := or(x, div(x, 0x02))
        x := or(x, div(x, 0x04))
        x := or(x, div(x, 0x10))
        x := or(x, div(x, 0x100))
        x := or(x, div(x, 0x10000))
        x := or(x, div(x, 0x100000000))
        x := or(x, div(x, 0x10000000000000000))
        x := or(x, div(x, 0x100000000000000000000000000000000))
        x := add(x, 1)
        let m := mload(0x40)
        mstore(m,           0xf8f9cbfae6cc78fbefe7cdc3a1793dfcf4f0e8bbd8cec470b6a28a7a5a3e1efd)
        mstore(add(m,0x20), 0xf5ecf1b3e9debc68e1d9cfabc5997135bfb7a7a3938b7b606b5b4b3f2f1f0ffe)
        mstore(add(m,0x40), 0xf6e4ed9ff2d6b458eadcdf97bd91692de2d4da8fd2d0ac50c6ae9a8272523616)
        mstore(add(m,0x60), 0xc8c0b887b0a8a4489c948c7f847c6125746c645c544c444038302820181008ff)
        mstore(add(m,0x80), 0xf7cae577eec2a03cf3bad76fb589591debb2dd67e0aa9834bea6925f6a4a2e0e)
        mstore(add(m,0xa0), 0xe39ed557db96902cd38ed14fad815115c786af479b7e83247363534337271707)
        mstore(add(m,0xc0), 0xc976c13bb96e881cb166a933a55e490d9d56952b8d4e801485467d2362422606)
        mstore(add(m,0xe0), 0x753a6d1b65325d0c552a4d1345224105391a310b29122104190a110309020100)
        mstore(0x40, add(m, 0x100))
        let magic := 0x818283848586878898a8b8c8d8e8f929395969799a9b9d9e9faaeb6bedeeff
        let shift := 0x100000000000000000000000000000000000000000000000000000000000000
        let a := div(mul(x, magic), shift)
        y := div(mload(add(m,sub(255,a))), shift)
        y := add(y, mul(256, gt(arg, 0x8000000000000000000000000000000000000000000000000000000000000000)))
    }  
}


//$NETTO = log(MEX)*(C_M)+ C_A / TIME^2 + C_S*EXP$
function calcolaCosto(uint MEX, uint256 TIME, uint256 EXP) public returns (uint256){
    uint256 netto = log2(MEX)*(10*USD_to_Wei)+ (20*USD_to_Wei) / (TIME*TIME)+(USD_to_Wei*20*EXP/100);
    uint256 costo = 2*100/(netto)+netto;
    return costo;
}

*/
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







