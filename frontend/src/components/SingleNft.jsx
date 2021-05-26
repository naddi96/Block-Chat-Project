import React from "react";
import DisplayModel from "./DisplayModel"

class SingleNft extends React.Component{
    async componentDidMount() {
        const x=this.props.data
        const authResult = new URLSearchParams(window.location.search); 
        const nft = authResult.get('nft')
        //console.log(nft)
        const web3= this.props.data.web3
        if(x.account !== "" && x.abi_nft_model != null && nft != null){
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
            let costo = await contract.methods.getCosto().call()
            let grisp= await contract.methods.getGaranziaRisposta().call()
            let creatore = 0//await contract.methods.getPropretarioFromId(0).call()
            //let min_blocco = await contract.methods.getMinutiBlocco()
            let js={full:true,nome:nome,lastid:lastid,minBlocco:minBlocco,costo:costo,grisp:grisp,creatore:creatore,contract:nft}
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
