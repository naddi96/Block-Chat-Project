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
            wei : null,
            eth: null
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


    render(){
        return(
            
            <div className="formCreaNft">
            <form>
            <div class="form-group">
              <label for="exampleFormControlInput1">Nome Nft</label>
              <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
            </div>

            <div class="form-group">
              <label for="exampleFormControlInput1">Data Scadenza</label>
              <input type="date" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
            </div>


            <div class="form-group">
              <label for="exampleFormControlInput1">Minuti di Blocco per messaggio</label>
              <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
            </div>

            <div class="form-group">
              <label for="exampleFormControlInput1">Minuti di Blocco per messaggio</label>
              <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
            </div>


            
            <div class="form-group">
              <label for="exampleFormControlInput1">Costo</label>
              <input value={this.state.wei} type="number" className="form-control" id="exampleFormControlInput1" placeholder="wei" onChange={this.changeWeiToEth}/>
              <input value={this.state.eth} type="number" className="form-control" id="exampleFormControlInput1" placeholder="Ether" onChange={this.changeEthToWei}/>
            </div>


            <div class="form-group">
              <label for="exampleFormControlSelect1">Example select</label>
              <select class="form-control" id="exampleFormControlSelect1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleFormControlSelect2">Example multiple select</label>
              <select multiple class="form-control" id="exampleFormControlSelect2">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Example textarea</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
          </form>
            <button>Crea Nft</button>
         </div>
        );
    }
}

export default CreateNft;
