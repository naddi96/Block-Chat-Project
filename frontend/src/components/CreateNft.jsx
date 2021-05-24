import React from "react";
import Units from "ethereumjs-units";
class CreateNft extends React.Component{


    async componentDidMount() {
        //console.log(nft)
        //const web3= this.props.data.web3
       // alert("prova")
        console.log()
        //if(x.account !== "" && x.abi_nft_model != null && nft != null){
        //}
    
    
    }
    
    constructor(props) {
        super(props)
        this.state = {
            wei : "",
            eth: "",
            nome: "",
            scadenza:"",
            minutiblocco:"",
            garanziarisposta:"Si",
            data:"",
            mint:""
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

        console.log(this.state)
        
        alert("aaa")

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
            <div class="form-group">
              <label for="exampleFormControlInput1">Nome Nft</label>
              <input onChange={e => this.setState({ nome: e.target.value })} 
              type="email" className="form-control" id="exampleFormControlInput1" placeholder="nft example"/>
            </div>

            <div class="form-group">
              <label for="exampleFormControlInput1">Data Scadenza</label>
              <input value={this.state.data} onChange={this.convertDatetToOffset} 
              type="date" className="form-control" id="exampleFormControlInput1" placeholder="no blocco"/>
            </div>


            <div class="form-group">
              <label for="exampleFormControlInput1">Minuti di Blocco per messaggio</label>
              <input value={this.state.minutiblocco} onChange={e => { if(e.target.value<=0 ){
                    this.setState({ minutiblocco : "" })
              }else this.setState({ minutiblocco:e.target.value })} }
              type="number" min="1" className="form-control" id="exampleFormControlInput1" placeholder="nessun blocco di default"/>
            </div>


            <div class="form-group">
              <label for="exampleFormControlInput1">Numero di nft comprabili</label>
              <input value={this.state.mint} onChange={e => {if(e.target.value<=0 ){
                    this.setState({ mint : "" })
              }else this.setState({ mint:e.target.value })} }
              type="number" min="1" className="form-control" id="exampleFormControlInput1" placeholder="nessun limite"/>
            </div>


            
            <div class="form-group">
              <label for="exampleFormControlInput1">Costo</label>
              <input value={this.state.wei} type="number" className="form-control" id="exampleFormControlInput1" placeholder="wei" onChange={this.changeWeiToEth}/>
              <input value={this.state.eth} type="number" className="form-control" id="exampleFormControlInput1" placeholder="Ether" onChange={this.changeEthToWei}/>
            </div>


            <div class="form-group">
              <label for="exampleFormControlSelect1">Garanzia Risposta</label>
              <select onChange={e => this.setState({ garanziarisposta : e.target.value })} 
               class="form-control" id="exampleFormControlSelect1">
                <option>Si</option>
                <option>No</option>
               </select>
            </div>
           
          </form>
          <button onClick={this.sendTransition}>Crea Nft</button>

         </div>
        );
    }
}

export default CreateNft;
