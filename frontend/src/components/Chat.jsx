
import React from "react";
import {sendmex,getmex} from "./requestsAPI";

/** Replace these with your own API keys, username and roomId from Chatkit  */

const username = 'perborgen'
const roomId = 9806194
class Chat extends React.Component {
    
    constructor() {
        super()
        this.state = {
            id_nft:null,
            contract_nft:null,
            account:null,
            creatore:null,
            limiteMessaggi:null,
            minBlocco:null,
            messages:[],
        }
        this.sendMessage = this.sendMessage.bind(this)
    } 


   async carica_contratto(nft,id){
        let abi=this.props.abi_nft_model
        let web3=this.props.web3
        let account=this.props.account
        const contract= new web3.eth.Contract(abi,nft)      
        let creatore = await contract.methods.getCreatore().call();
        let limiteMessaggi = await contract.methods.getLimiteMex().call();
        let minBlocco = await contract.methods.getMinutiBlocco().call();
        let primoMex = await contract.methods.getPrimoMex(id).call();
        let css="mymex"
        if (creatore===account){
            css="othermex"
        }
        
        this.setState({
            id_nft:id,
            contract_nft:nft,
            account:account,
            creatore:creatore,
            limiteMessaggi:limiteMessaggi,
            minBlocco:minBlocco,
            messages:[{
                css:css,
                text:primoMex,
            }]
        })
   }

   async componentDidMount() {
        
        const authResult = new URLSearchParams(window.location.search);
        const nft = authResult.get("nft");
        const id = authResult.get("id");
    
        if ( this.props.account!= "" && nft && id){
            await this.carica_contratto(nft,id)
            let x=await getmex(this.props.account,id,nft)
            
            let li=this.state.messages
            for (let i=0; i<x.length;i++){
                if (x[i].sender === this.state.creatore){
                    li.push(
                        {
                            css:"othermex",
                            text:x[i].mex,
                        })
                }else{
                    li.push(
                        {
                            css:"mymex",
                            text:x[i].mex,
                        })
                }
            }
            this.setState({
                messages:li,

            })
        
        }

        
    }    
    
    async sendMessage(text) {
        let risp=await sendmex(text,this.state.account,this.state.id_nft,this.state.contract_nft)
        console.log(risp)
        if (risp==="vincoli non soddisfatti"){
            alert("messaggio bloccato: Hai esaurito i messaggi per il momento")
            return
        }
        this.setState({
            messages:this.state.messages.concat([{
             css:"mymex",
            text:text,
            roomId:roomId, 
        }])
  
        })
    }
    
    render() {
        return (
            <div className="app">
              
              <MessageList 
                  roomId={this.state.roomId}
                  messages={this.state.messages} />
              <SendMessageForm
                  sendMessage={this.sendMessage} />
            </div>
        );
    }
}

class MessageList extends React.Component {
    render() {
        return (
            <ul className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                    <div className="mexContainer">
                      <div  key={message.id} className={message.css}>
                      <div>{message.senderId}</div>
                        
                        <div className="msg-text">{message.text}</div>
                      </div>
                      </div>
                    )
                })}
            </ul>
        )
    }
}

class SendMessageForm extends React.Component {
    constructor() {
        super()
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }
    
    handleSubmit(e) {
        e.preventDefault()
        this.props.sendMessage(this.state.message)
        this.setState({
            message: ''
        })
    }
    
    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="send-message-form">
                <input
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="Type your message and hit ENTER"
                    type="text" />
            </form>
        )
    }
}

function Title() {
  return <p className="title">My awesome chat app</p>
}


export default Chat;
