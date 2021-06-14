import React from "react";
import Units from "ethereumjs-units";
class CreateNft extends React.Component{


    async componentDidMount() {
        let x= this.props.data
        console.log(this.props.data)
        this.setState({account:x.account}) 
        this.setState({contract: x.contract})
        this.setState({web3:x.web3})
    }
    
    constructor(props) {
        super(props)
        this.state = {
            account:"",
            wei : "",
            eth: "",
            nome: "",
            scadenza:"",
            minutiblocco:"",
            garanziarisposta:true,
            data:"",
            limitemessaggi:"",
            mint:"",
            contract:null,
            web3:null,
        }
      }


    changeWeiToEth =(e)=>{
        try{
            let x=Units.convert(e.target.value, 'wei', 'eth') 
            this.setState({wei:e.target.value,eth:x})    
        }catch{
            this.setState({wei:"",eth:""})    
        }
        //console.log(x)


    }
    changeEthToWei =(e)=>{
        try{
            let x=Units.convert(e.target.value,'eth', 'wei') 
            this.setState({wei:x,eth:e.target.value})    
        }catch{
            this.setState({wei:"",eth:""})    
        }
    }


    sendTransition= (e)=>{
        
        let stri=""
        if (this.state.nome===""){
            stri="Inserire il nome\n"
        }
        if (this.state.scadenza===""){
            stri=stri+"Inserire una scadenza\n"
        }
        if (this.state.wei===""){
            stri=stri+"Inserire il costo\n"
        }
        
        if (stri!==""){
            alert(stri)
            return
        }
        let minblocco=this.state.minutiblocco
        let limex=this.state.limitemessaggi
        let mint= this.state.mint

        if (this.state.minutiblocco==="") minblocco=0

        if (this.state.limitemessaggi==="") limex=0
        
        if (this.state.mint==="") mint=0

        let contract= this.state.contract
        console.log(this.state)
        contract.methods.creaModelloNft(
            this.state.nome,
            minblocco,
            limex,
            mint,
            this.state.scadenza,
            this.state.wei
            )
                .send({from: this.state.account})
                .on('receipt', function (receipt) {
                    alert("transazione ricevuta")
                    console.log("receipt:" + receipt);
                }).on('confirmation', function (confirmationNumber, receipt) {
                    //alert("transazione confermata")
                    console.log("confirmationNumber:" + confirmationNumber + " receipt:" + receipt);
                    console.log(receipt)
                }).on('error', function (error) {
                    alert("transazione non completata ci sono stati degli errori causa:\n"+error.stack)

                    console.log(error.stack)
                });
    }


    convertDatetToOffset =(e)=>{
        let now=new Date().getTime();
        let selected_date=new Date(e.target.value).getTime();
        if(now> selected_date){
            alert("la scadenza non può essere nel passato")
            this.setState({data:""})
        }else{ 

            let offset=selected_date-now
            this.setState({scadenza:offset})
            this.setState({data:e.target.value})
        }
    }

    render(){
        return(
            
            <div className="formCreaNft">
            
            <form>
            <p>{this.state.account}</p>
            <div className="form-group">
              <label>Nome Nft</label>
              <input onChange={e => this.setState({ nome: e.target.value })} 
              type="email" className="form-control"  placeholder="nft example"/>
            </div>

            <div className="form-group">
              <label>Data Scadenza</label>
              <input value={this.state.data} onChange={this.convertDatetToOffset} 
              type="date" className="form-control"  placeholder="no blocco"/>
            </div>


            <div className="form-group">
              <label >Minuti di blocco per messaggio</label>
              <input value={this.state.minutiblocco} onChange={e => { if(e.target.value<=0 ){
                    this.setState({ minutiblocco : "" })
              }else this.setState({ minutiblocco:e.target.value })} }
              type="number" min="1" className="form-control"  placeholder="nessun blocco di default"/>
            </div>


            
            <div className="form-group">
              <label >Limite Messaggi</label>
              <input value={this.state.limitemessaggi} onChange={e => { if(e.target.value<=0 ){
                    this.setState({ limitemessaggi : "" })
              }else this.setState({ limitemessaggi:e.target.value })} }
              type="number" min="1" className="form-control" placeholder="nessun blocco di default"/>
            </div>


            <div className="form-group">
              <label>Numero di nft comprabili</label>
              <input value={this.state.mint} onChange={e => {if(e.target.value<=0 ){
                    this.setState({ mint : "" })
              }else this.setState({ mint:e.target.value })} }
              type="number" min="1" className="form-control"  placeholder="nessun limite"/>
            </div>


            
            <div className="form-group">
              <label >Costo</label>
              <input value={this.state.wei} type="number" className="form-control" placeholder="wei" onChange={this.changeWeiToEth}/>
              <input value={this.state.eth} type="number" className="form-control" placeholder="Ether" onChange={this.changeEthToWei}/>
            </div>


        
           
         


          </form>
          <button onClick={this.sendTransition}>Crea Nft</button>

         </div>
        );
    }
}

export default CreateNft;
