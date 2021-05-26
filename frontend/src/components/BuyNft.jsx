import React from "react";
import DisplayModel from "./DisplayModel";

//prendere un'instanza specifica di NFT e mostrarla + pulsante buy (collegamento al contratto)

class BuyNft extends React.Component{
    async componentDidMount() {
        const x=this.props.data
        // get contratto dall'url
        const authResult = new URLSearchParams(window.location.search); 
        const nft = authResult.get('nft')
        //console.log(nft)
        
        const web3= this.props.data.web3
        if(x.account !== "" && x.abi_nft_model !== null && nft != null && x.web3 != null){
            console.log("aaaaa")
            try {
                console.log(this.props)
                new web3.eth.Contract( x.abi_nft_model, nft)
            } catch (error) {
                alert("contratto non esistente")
                return                
            }
            let contract = new web3.eth.Contract( x.abi_nft_model, nft)
            this.setState({contract:contract})
            let nome = await contract.methods.getNome().call()
            let lastid =await contract.methods.getLastId().call()
            let minBlocco =await contract.methods.getMinutiBlocco().call()
            let limiteMessaggi = await contract.methods.getLimiteMex().call()
            let limiteMint = await contract.methods.getLimiteMint().call()
            let costo = await contract.methods.getCosto().call()
            let gRisp= await contract.methods.getGaranziaRisposta().call()
            //let scadenza 
            let creatore = 0    //await contract.methods.getPropretarioFromId(0).call()
            let js={full:true,
                nome:nome,
                lastid:lastid,
                minBlocco:minBlocco,
                costo:costo,
                limiteMessaggi:limiteMessaggi,
                limiteMint:limiteMint,
                gRisp:gRisp,
                creatore:creatore,
                contract:nft}
            this.setState({contract_nft:js})
            console.log(js)
        }
    
    
    }
    
    constructor(props) {
        super(props)
        this.state = {
            contract_nft:null,
            contract:null
        }
      }
    
      sendTransition = (e)=>{
        let contract = this.state.contract

        contract.methods.compraNft('ciaooooo')
                .send({from: this.props.data.account, value:this.state.contract_nft.costo})
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

    render () {
        
        return (
  
                <div className="home">
                <div className="container">
                        <DisplayModel item={this.state.contract_nft}/>
            </div>
                <div className="card-body">
                <a onClick={this.sendTransition} className="card-link">Compra</a>
                <a href="./#" className="card-link">Another link</a>
                </div>
                </div>
            );
          
    }

}


export default BuyNft;
