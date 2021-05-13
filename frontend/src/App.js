import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, About, Contact } from "./components";


class App extends React.Component {
  /*
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
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

    const networkId = await web3.eth.net.getId()
    const net_block_chat = Block_chat.networks[networkId]

       
    console.log(Nft_model)
    if(net_block_chat) {
      const abi = Block_chat.abi
      const address = net_block_chat.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      console.log( ) 
   
      let cc=await contract.methods.getNFTlist().call()
      console.log(cc)
      let contract2 = new web3.eth.Contract(Nft_model.abi, cc[0])
     
     // await contract2.methods.compraNft().send({from: this.state.account})

     console.log(await contract2.methods.ownerOf("3").call())
     
     
     //   const totalSupply = await contract.methods.totalSupply().call()
    //  this.setState({ totalSupply })
      // Load Colors
    
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }

  
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null,
      totalSupply: 0,
      colors: []
    }
  }

*/

  render() {
    return (

      <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/about" exact component={() => <About />} />
          <Route path="/contact" exact component={() => <Contact />} />
        </Switch>
        <Footer />
      </Router>
    </div>

      );
    }
  }


export default App;
