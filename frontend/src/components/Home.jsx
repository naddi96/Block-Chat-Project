import React from "react";
import DISPLAY_MODEL from "./DISPLAY_MODEL";





class NFT_MODELS extends React.Component {
  async componentWillMount() {
    

  }
  
  render() {

   
      return (
        <ul>
          {
          this.props.animals.map(item => (
            <DISPLAY_MODEL item={item} />
          ))}
        </ul>
      );
    };

   }



       

class Home extends React.Component {

  async componentWillMount() {
    const x=this.props.data
    
    if(x.account != "" && x.abi_nft_model != null && x.contract_block_chat != null){
      console.log(await this.load_nft_models())
    }


  }

async load_nft_models() {
  let nft_models_contracs = await this.props.data.contract_block_chat.methods.getNFTlist().call()
  let web3 =this.props.data.web3_istance
  let li=Array()
  
  for(let i=0;i<nft_models_contracs.length;i++){
    //console.log(nft_models_contracs[i])
    
    
    let contract = new web3.eth.Contract(this.props.data.abi_nft_model, nft_models_contracs[i])
    let nome = await contract.methods.getNome().call()
    let lastid =await contract.methods.getLastId().call()
    let minBlocco =await contract.methods.getMinutiBlocco().call()
    let costo = await contract.methods.getCosto().call()
    let grisp= await contract.methods.getGaranziaRisposta().call()
    let creatore = await contract.methods.getPropretarioFromId(0).call()
    //let min_blocco = await contract.methods.getMinutiBlocco()
    let js={nome:nome,lastid:lastid,minBlocco:minBlocco,costo:costo,grisp:grisp,creatore:creatore,contract:nft_models_contracs[i]  }
    li.push(js)
    //console.log(js)

  }


  this.setState({list_nft_models:li})
  
  

}




  constructor(props) {
    super(props)
    this.state = {
      list_nft_models:[],

    }
  }



  render() {
  
  const animals = this.state.list_nft_models
   // [{ last_id: 1,creator:"0x539b3c0E322CD9Dcbd8Af99ccd42f2E928255C6a" ,nome_modello: "Modello della Vita" ,minuti_blocco:2, costo:30, limite_mex:33,garanzia_risp:"no"},
   // { last_id: 1,creator:"0x539b3c0E322CD9Dcbd8Af99ccd42f2E928255C6a" ,nome_modello: "Modello della Vita" ,minuti_blocco:2, costo:30, limite_mex:33,garanzia_risp:"no"} ];

  //console.log(animals)
  return (
  
  
  <div className="home">
     <div className="container">

   
     <NFT_MODELS animals={animals} />

   
 </div> </div>
  );
}
}

export default Home;
