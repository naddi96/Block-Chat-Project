import React from "react";
import Web3 from "web3";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import  Navigation from "./components/Navigation"
import Homepage  from "./components/Homepage";
import Block_chat from "./build/contracts/BlockChat.json";
import Nft_model from "./build/contracts/NFT_MODEL.json";
import CreateNft from "./components/CreateNft";

import BuyNft from "./components/BuyNft"
import Chat from "./components/Chat"
import ChatListBuyer from "./components/ChatListBuyer"
import ChatListCreator from "./components/ChatListCreator"
import NftShop from "./components/NftShop";
class App extends React.Component {

  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }


  async loadWeb3() {
    console.log()
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    this.interval = setInterval(async () => {
      const accounts = await web3.eth.getAccounts()
      if (accounts[0]!== this.state.account){
          this.setState({ account: accounts[0] })
      }

    } , 900);

    
    const networkId = await web3.eth.net.getId()
    const net_block_chat = Block_chat.networks[networkId]
    /*
    console.log("aaaaaaaaaa")
    let msg = "Some dataa" 
    let msgHash1 = web3.utils.sha3(msg)
    console.log(accounts)
    console.log(msg)
    console.log(msgHash1)
    
    let sig1 = await web3.eth.sign(msgHash1, accounts[0]);
    console.log(sig1)
    */

    if(net_block_chat) {
      const abi = Block_chat.abi
      const address_contract = net_block_chat.address
      const contract_block = new web3.eth.Contract(abi, address_contract)      
      this.setState({ contract_block_chat:contract_block })
      this.setState({abi_nft_model:Nft_model.abi})


    this.setState({web3_istance:web3})

    // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.

    
      //let cc=await contract_block.methods.getNFTlist().call()
      //console.log(cc)
      //let contract2 = new web3.eth.Contract(Nft_model.abi, cc[0])
     // await contract2.methods.compraNft().send({from: this.state.account})
     //console.log(await contract2.methods.ownerOf("3").call())
     
     //   const totalSupply = await contract.methods.totalSupply().call()
    //  this.setState({ totalSupply })
      // Load Color s
    
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }

  
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      abi_nft_model: null,
      contract_block_chat: null,
      web3_istance:null
    }
  }

  

  render() {
    if (this.state.account !=="" &&
      this.state.abi_nft_model!= null &&
      this.state.contract_block_chat!= null &&
      this.state.web3_istance != null){
      return (

        <div className="App">

       
        <Router>
          
          
          <Switch>
            
            <Route path="/NftShop" exact component={ () => <div><Navigation web3={this.state.web3_istance} account={this.state.account}/><NftShop data= {this.state}/></div>}/>
            <Route path="/" exact component={ () => <Homepage/>} />
          
          <Route path="/createNft" exact component={() => <div>
          
                     <Navigation  web3={this.state.web3_istance} account={this.state.account}/>
                      <CreateNft data={{
                        account:this.state.account,
                        web3:this.state.web3_istance, 
                        contract:this.state.contract_block_chat
                      }} />                     
                      </div>} />
          
          <Route path="/buyNft" exact component={() => <div>
                      <Navigation  web3={this.state.web3_istance} account={this.state.account}/>
                      <BuyNft data={{account:this.state.account,
                        web3:this.state.web3_istance, 
                        abi_nft_model:this.state.abi_nft_model}} />
                        </div>} />
            
    
          <Route path="/chat" exact component={() => 
          <div>
          <Navigation  web3={this.state.web3_istance} account={this.state.account}/>
          <Chat account={this.state.account}
                abi_nft_model={  this.state.abi_nft_model}
                web3={this.state.web3_istance} /> 
                </div>}
            />


          <Route path="/ChatListBuyer" exact component={() => 
          <div>

          <Navigation web3={this.state.web3_istance} account={this.state.account}/>
          
          <ChatListBuyer
                  account={this.state.account}
                  web3={this.state.web3_istance}
                  contract={this.state.contract_block_chat}
            /> </div>} />
          
          <Route path="/ChatListCreator" exact component={() => 
          <div>
          <Navigation web3={this.state.web3_istance} account={this.state.account}/>
          <ChatListCreator
                  account={this.state.account}
                  web3={this.state.web3_istance}
                  contract={this.state.contract_block_chat}
            />
            </div>
            
            }  />
          
          
          </Switch>
         
        </Router>
      </div>

      );}else return (
        <Router>
      <Homepage/>
      </Router>
      
)
    }
  }


export default App;
