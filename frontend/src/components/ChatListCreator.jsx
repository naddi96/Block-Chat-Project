
import React from "react";
import { Link } from "react-router-dom";
import Nft_model from "../build/contracts/NFT_MODEL.json";
import UploadImg from "./UploadImg";
import {get_image} from "./requestsAPI"


class ChatListCreator extends React.Component {

    async componentDidMount() {
        const x=this.props
        if(x.account !== "" &&  x.contract !== null){
          x.contract.events.ModelloNftCreato({fromBlock: 0,filter:{_from:x.account}},this.load_nft_model_event)
        }
      }
    



    
       load_nft_model_event = (error,event) => {      
        //console.log("aaa")
        let nome = event.returnValues.nome_modello
        let contratto=event.returnValues.indirizzo_contratto
        let js={nome:nome,contract:contratto }
        let stato=this.state.list_nft_models
        this.setState( {list_nft_models: [js].concat(stato)})        

      }
    
    
    
        constructor(props) {
    
            super(props)
            this.state = {
                list_nft_models:[],
            }
          }

    render() {

        const authResult = new URLSearchParams(window.location.search);
        const nft = authResult.get("nft");
        

        console.log(nft)

        if (nft !== null){

            return(
            <ChatListNft
                account={this.props.account}
                web3={this.props.web3}
                />
            )

        }else{



                return (

       
                    <div>
  
                        <div class="messages-box">
                            <div class="list-group rounded-0">
                            {this.state.list_nft_models.map( (message, index) => {
                            return (
                                <div class="itemchat" >

                                <div class="list-group-item list-group-item-action active text-white token-list">

                            <div class="media">

                                <div class="media-body ml-4">
                                    <div class="info-item">
                                    <Link to={"/ChatListCreator?nft="+message.contract+"&nome="+message.nome} class="info-item">
                                        <div class="token-img"><img src={get_image(message.contract)} alt="..."/></div>
                                        <h6 class="mb-0" >{message.nome}</h6>
                                        <p class="font-italic mb-0 text-small">Token Originale: {message.contract}</p>
                                       
                            
                                    </Link>
                    
                                    <UploadImg 
                                            account={this.props.account}
                                            nft={message.contract}></UploadImg>
                                    </div>
                                </div>


                            </div>

                        </div>
                        
                    </div>
                            
                        
                            )})}

                    
                            </div>
                        </div>
                    </div>
                    

            )

        }













        
    }

}


class ChatListNft extends React.Component {

    async componentDidMount() {
        const authResult = new URLSearchParams(window.location.search);
        const nft = authResult.get("nft");
        const nome = authResult.get("nome");
        if (nft!= null){
        await this.carica_contratto(nft)
        this.setState({nft:nft})
        this.setState({nome:nome})
        }
    }


    async carica_contratto(nft){
        let abi=Nft_model.abi
        let web3=this.props.web3
        let contract= new web3.eth.Contract(abi,nft)      
        let lastid = await contract.methods.getLastId().call();
        this.setState({
            lastid:lastid
        })


    }

    constructor() {
        super()
        this.state = {
            lastid:0,
            nft:null,
            nome:""

        }
    } 


    render() {

        var elements=[];
        for(var i=1; i <=this.state.lastid ; i++){
            elements.push(
                <Link to={"/chat?nft="+this.state.nft+"&id="+(i)}>
                                                <div class="itemchat" >
                                                <div class="list-group-item list-group-item-action active text-white">
                                                    <div class="media">
                                                        <div class="media-body ml-4">
                                                        <div class="info-item">
                                                                <h6 class="mb-0">{this.state.nome}</h6>
                                                                <small class="small font-weight-bold">id: {i}</small>
                                                                <p class="font-italic mb-0 text-small">Token: {this.state.nft}</p>
                                                            </div>
                                                            
                                                        </div>

                                                    </div>  

                                                </div>
                                            </div>
                                            </Link>
            
            );
        }

        return(
            <div>
            <div class="messages-box">
            <div class="list-group rounded-0">
            

                
            {elements}
                       
        </div>
            </div>
                    </div>

        )

    }




}


export default ChatListCreator;
