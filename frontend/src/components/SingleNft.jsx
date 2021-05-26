import React from "react";
import DisplayModel from "./DisplayModel"

class SingleNft extends React.Component{


    async componentDidMount() {
        const x=this.props.data
        // get contratto dall'url
        const authResult = new URLSearchParams(window.location.search); 
        const nft = authResult.get('nft')
        //console.log(nft)

        const web3= this.props.data.web3
        if(x.account !== "" && x.abi_nft_model != null && nft != null && x.web3 != null){
            console.log("aaaaa")
            try {
                 new web3.eth.Contract( x.abi_nft_model, nft)
            } catch (error) {
                alert("contratto non esistente")
                return                
            }
            let contract = new web3.eth.Contract( x.abi_nft_model, nft)
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
            contract_nft:null
        }
      }
    render(){
        return (
            <DisplayModel item={this.state.contract_nft}/>

)

    }
}

export default SingleNft;
