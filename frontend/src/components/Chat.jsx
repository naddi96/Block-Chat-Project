
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
            data_scadenza:"",
            account:null,
            creatore:null,
            limiteMessaggi:null,
            minBlocco:null,
            scadenza_timestamp:null,
            nome:"",
            reclamo_fatto:false,
            vip_risposta:true,
            messages:[],
        }
        this.sendMessage = this.sendMessage.bind(this)
    } 

formattedDate(date) {
    return [date.getDate(), date.getMonth()+1, date.getFullYear()]
        .map(n => n < 10 ? `0${n}` : `${n}`).join('/');
    }
   async carica_contratto(nft,id){
        let abi=this.props.abi_nft_model
        let web3=this.props.web3
        let account=this.props.account
        let contract= new web3.eth.Contract(abi,nft)      
        let nome= await contract.methods.getNome().call()
        let scadenza_timestamp = await contract.methods.getTimestampDeadline().call()
        let creatore = await contract.methods.getCreatore().call();
        let limiteMessaggi = await contract.methods.getLimiteMex().call();
        let minBlocco = await contract.methods.getMinutiBlocco().call();
        let primoMex = await contract.methods.getPrimoMex(id).call();
        let vip_risposta = await contract.methods.getVipRiposta(id).call()
        let reclamo_fatto = await contract.methods.getReclamoFatto(id).call()
        
        let css="mymex"
        let data_scadenza=new Date(scadenza_timestamp*1000)
        



        if (limiteMessaggi === "0" ){
            limiteMessaggi="Illimitati" 
        }


        if (minBlocco === "0" ){
            minBlocco="Illimitati"
        }
        
        if (creatore===account){
            css="othermex"
        }
        
        this.setState({
            reclamo_fatto:reclamo_fatto,
            vip_risposta:vip_risposta,
            data_scadenza:this.formattedDate(data_scadenza),
            scadenza_timestamp:scadenza_timestamp*1000,
            primoMex:primoMex,
            nome:nome,
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

            if (this.state.limiteMessaggi !== "illimitati" && this.state.limiteMessaggi !== null ){
                let totali= parseInt( this.state.limiteMessaggi)+1   
                let limitemex = totali - parseInt(this.state.messages.length) 
                this.setState({limiteMessaggi:limitemex})
            }        

    
            

        }

        
    }    
    
    count_mex_compratore(list,creatore) {
        let count=0
        for (let i=0;i<list.length;i++){
            if(list[i].sender === creatore){
                count++
            }
        }
        return count
    }

    async sendMessage(text) {
        if( this.state.account === this.state.creatore){
            if ( !this.state.vip_risposta){
                this.state.contract_istance.methods
                .confermaRisposta(this.state.id_nft,this.state.primoMex).send({
                    from: this.state.account})
                    .on("receipt", (receipt) => {
                        alert("transazione ricevuta");
                        console.log("receipt:" + receipt);
                      })
                      .on("confirmation", function (confirmationNumber, receipt) {
                        //alert("transazione confermata")
                        console.log(
                          "confirmationNumber:" + confirmationNumber + " receipt:" + receipt
                        );
                        console.log(receipt);
                      })
                      .on("error", function (error) {
                        alert(
                          "transazione non completata ci sono stati degli errori causa:\n" +
                            error.stack
                        );
                
                        console.log(error.stack);
                      })

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
    
    check_if_can_do_reclamo(){
        let date = new Date(this.state.scadenza_timestamp).getTime()
        let now =  new Date().getTime()
        if (date < now && ! this.state.vip_risposta && ! this.state.account === this.state.creatore){
            return true
        }
        return false
    }


    do_reclamo = () => {

        this.state.contract_istance.methods
        .reclamo(this.state.id_nft).send({
            from: this.state.account})
            .on("receipt", (receipt) => {
                alert("transazione ricevuta");
                console.log("receipt:" + receipt);
              })
              .on("confirmation", function (confirmationNumber, receipt) {
                //alert("transazione confermata")
                console.log(
                  "confirmationNumber:" + confirmationNumber + " receipt:" + receipt
                );
                console.log(receipt);
              })
              .on("error", function (error) {
                alert(
                  "transazione non completata ci sono stati degli errori causa:\n" +
                    error.stack
                );
        
                console.log(error.stack);
              });
    }

    render() {
  
        let bottone=""
        
        
        
        if(this.check_if_can_do_reclamo()){
            bottone=<button  onClick={this.do_reclamo} className="reclamo-button">Clicca qui per fare reclamo</button>
        }
        
        if (this.state.reclamo_fatto){
            bottone=<button  style={{background:"green"}} className="reclamo-button">reclamo già fatto</button>
        }


        return (
            <div className="app">
                {bottone}
              <MessageList 
                  nome={this.state.nome}
                  id_nft={this.state.id_nft}
                  minBlocco= {this.state.minBlocco}
                  limiteMessaggi={this.state.limiteMessaggi}
                  messages={this.state.messages}
                  data_scadenza={this.state.data_scadenza}
                   />
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
      <td>{this.props.nome}</td>
      <td>{this.props.limiteMessaggi}</td>
      <td>{this.props.minBlocco}</td>
      <td>{this.props.id_nft}</td>
      <td>{this.props.data_scadenza}</td>
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
