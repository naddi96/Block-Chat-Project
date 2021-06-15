import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./styleHome.css";
import Chat from "./Chat";




class Homepage extends React.Component{

render(){
   return(
    <div id="service" class="Services">
         <div class="container">
            <div class="row">
               <div class="col-md-12">
                  <div class="titlepage">
                     <h2>Benvenuto a Blockchat!</h2>
                     <p>Scopri cosa è in grado di offrirti questo nuovissimo social:
                     </p>
                  </div>
               </div>
            </div>
            <div class="row">
               <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
               <Link to="/NftShop">
                  <div class="Services-box">
                     <i><img src="images/service1.png" alt="#" /></i>
                     <h3> Lista degli NFT in vendita</h3>
                     <p>Acquista un NFT per poter chattare con i tuoi VIP preferiti!</p>
                  </div>
               </Link>
               </div>
               <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                  <Link to="/chat">
                  <div class="Services-box">
                  
                     <i><img src="images/service2.png" alt="#" /></i>
                     <h3>Chat</h3>
                     <p>Hai già acquistato degli NFT? Cosa aspetti, vai subito a chattare!</p>
                  </div>
                  </Link>
               </div>
               <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12">
               <Link to="/createNft">
                  <div class="Services-box">
                     <i><img src="images/service3.png" alt="#" /></i>
                     <h3>Crea NFT</h3>
                     <p>Sei bello/a e famoso/a e vuoi fare soldi? Crea i tuoi NFT e inizia a guadagnare!</p>
                  </div>
               </Link>
               </div>
               </div>
         </div>
      </div>
   );
}
}

export default Homepage;