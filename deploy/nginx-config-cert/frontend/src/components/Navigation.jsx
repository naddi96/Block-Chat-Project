import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import logo from "./images/logo.png"
import LoginButton from "./LoginButton";

function Navigation(props) {
  return (
    <Navbar bg="navbar navbar-dark bg-dark" expand="lg">
    
    
    <Link className="navbar-brand" to="/">
    <span> <img src={logo} width="30" height="30" alt=""/></span>
      <span> BlockChat</span>
      
    </Link>
    
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  

  <Navbar.Collapse id="basic-navbar-nav">
  
    <Nav className="mr-auto">
    <Link className="nav-link" to="/">
      Home
      </Link>
    
      <Link className="nav-link" to="/NftShop">
        Aquista Nft
      </Link>
    
      <Link className="nav-link" to="/ChatListBuyer">
        Chat con i VIP 
      </Link>

      <Link className="nav-link" to="/ChatListCreator">
        Chat con i tui fan 
      </Link>

      
      <Link className="nav-link" to="/createNft">
        Crea Nft
      </Link>

      

    

      




        <LoginButton  web3={props.web3} account={props.account}/>

    </Nav>
  </Navbar.Collapse>
  

</Navbar>
  );
}

export default withRouter(Navigation);
