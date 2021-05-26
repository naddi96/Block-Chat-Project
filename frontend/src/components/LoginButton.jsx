import React from "react";
import {login} from "./requestsAPI"
class LoginButton extends React.Component{




faiLogin = () => {
   let prova =  login(this.props.data.account,this.props.data.web3)
   prova.then(value => 
        console.log("successo login",value)
    )
}

    constructor(props) {
        super(props)
        this.state = {
            contract_nft:null
        }
      }
    render(){
        if(this.props.data.account !=null){
            return (<button onClick={() => this.faiLogin()}>Login</button>)
        }
        return (<button>PRO</button>)
    }                 
        
    

}

export default LoginButton;
