import React from "react";
import {login} from "./requestsAPI"
class LoginButton extends React.Component{




faiLogin = () => {
   let prova =  login(this.props.account,this.props.web3)
   prova.then(value => 
        console.log("successo login",value)
    )
}

    render(){
        if(this.props.account !=null){
            return (<p  htref="#" className="nav-link" onClick={() => this.faiLogin()}>Login con account:
                <div style={{color:"white" ,fontSize: "10px"}}>
                        {this.props.account}
                </div>
            </p>


           

            
            )
           
        }
        return ("")
    }                 
        
    

}

export default LoginButton;
