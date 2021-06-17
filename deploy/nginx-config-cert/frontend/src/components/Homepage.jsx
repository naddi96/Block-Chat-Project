import React from "react";
import { Link } from "react-router-dom";
import "./styleHome.css";
import chatIcon from "./images/Chat.png";
import createIcon from "./images/createNft.png";
import ShopIcon from "./images/NftShop.png";



class Homepage extends React.Component{

render(){
   return(
   <div id="homepage">
    <div id="service" class="Services">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <div class="titlepage">
                     <h2>Benvenuto su Blockchat!</h2>
                     <p>Scopri cosa è in grado di offrirti questo nuovissimo social:
                     </p>
                  </div>
               </div>
            </div>
            <div class="row">
               <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
               <Link to="/NftShop">
                  <div class="Services-box">
                     <i><img src={ShopIcon} alt="#" /></i>
                     <h3> Lista degli NFT in vendita</h3>
                     <p>Acquista un NFT per poter chattare con i tuoi VIP preferiti!</p>
                  </div>
               </Link>
               </div>
               <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <Link to="/ChatListBuyer">
                  <div class="Services-box">
                     <i><img src={chatIcon} alt="#" /></i>
                     <h3>Chat con i VIP</h3>
                     <p>Hai già acquistato degli NFT? Cosa aspetti, vai subito a chattare!</p>
                  </div>
                  </Link>
               </div>
               <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
               <Link to="/ChatListCreator">
                  <div class="Services-box">
                     <i><img src={chatIcon} alt="#" /></i>
                     <h3>Chat con i fan</h3>
                     <p>Hai già qualche fan che ha comprato i tuoi NFT? Forza, rispondigli!</p>
                  </div>
               </Link>
               </div>
               <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
               <Link to="/createNft">
                  <div class="Services-box">
                     <i><img src={createIcon} alt="#" /></i>
                     <h3>Crea NFT</h3>
                     <p>Sei bello/a e famoso/a e vuoi fare soldi? Crea i tuoi NFT e inizia a guadagnare!</p>
                  </div>
               </Link>
               </div>
               </div>
         </div>
      </div>
      </div>
   );
}
}

export default Homepage;