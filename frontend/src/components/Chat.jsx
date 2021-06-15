
import React from "react";
import {sendmex,getmex} from "./requestsAPI";

/** Replace these with your own API keys, username and roomId from Chatkit  */

class Chat extends React.Component {
    
    constructor() {
        super()
        this.state = {
            id_nft:null,
            primoMex:null,
            contract_istance:null,
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
        let contract= new web3.eth.Contract(abi,nft)      
        let creatore = await contract.methods.getCreatore().call();
        let limiteMessaggi = await contract.methods.getLimiteMex().call();
        let minBlocco = await contract.methods.getMinutiBlocco().call();
        let primoMex = await contract.methods.getPrimoMex(id).call();
        let css="mymex"
        if (creatore===account){
            css="othermex"
        }
        
        this.setState({
            primoMex:primoMex,
            id_nft:id,
            contract_istance:contract,
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
    
        if ( this.props.account!== "" && nft && id){
            await this.carica_contratto(nft,id)
            let x=await getmex(this.props.account,id,nft)
            
            let li=this.state.messages
            for (let i=0; i<x.length;i++){
                if (x[i].sender === this.props.account){
                    li.push(
                        {   
                            sender:x[i].sender,
                            css:"mymex",
                            text:x[i].mex,
                        })
                }else{
                    li.push(
                        {
                            sender:x[i].sender,
                            css:"othermex",
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
        let confermaDaCreator=false
        if( this.state.account === this.state.creatore){
            console.log("aaaa")

            for (let i=0; i<this.state.messages.length ;i++){
                if (this.state.messages[i].sender ===this.state.creatore){
                    console.log("sss")
                    confermaDaCreator=true
                }
            }
            
            if (!confermaDaCreator){
                console.log("aaaassss")

                this.state.contract_istance.methods
                .confermaRisposta(this.state.id_nft,this.state.primoMex).send({
                    from: this.state.account});

            }
        }
        
        
        
        let risp=await sendmex(text,this.state.account,this.state.id_nft,this.state.contract_nft)
        console.log(risp)
        if (risp==="vincoli non soddisfatti"){
            alert("messaggio bloccato: Hai esaurito i messaggi per il momento")
            return
        }
        this.setState({
            messages:this.state.messages.concat([{
            sender:this.state.account,
            css:"mymex",
            text:text,
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
                <div className="contract-info">
                <div class="table-responsive-sm">
                <table className="table table-borderless">
  <thead>
    <tr>
    <th scope="col">Nome nft</th>
      <th scope="col">Messaggi rimasti</th>
      <th scope="col">Minuti blocco</th>
      <th scope="col">id</th>
      <th scope="col">Scadenza</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>provaaaaaa</td>
      <td>3</td>
      <td>3</td>
      <td>3</td>
      <td>2/05/2020</td>
    </tr>
  </tbody>
</table>
</div>

                
                </div>
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


export default Chat;
