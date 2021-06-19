var HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC = 'ACCOUNT PRIVATE KEY';
const ETH_NODE = 'https://ropsten.infura.io/v3/API_key'



module.exports = {
  // Uncommenting the defaults below 
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  plugins: ["truffle-contract-size"],
    networks: {
      development: {
        host: "127.0.0.1",
        port: 8545,
        network_id: "*",
            
        //gas:117000000  
      },
      ropsten: {
        provider: function() {
          return new HDWalletProvider(MNEMONIC,ETH_NODE)
        },
        network_id: 3,
      }


  //  test: {
  //    host: "127.0.0.1",
  //    port: 7545,
  //    network_id: "*"
  //  }
  },

  compilers: {
    
    solc: {
      version: "0.8.0",
      optimizer: {
        enabled: true,
        runs: 200
    }
    }
  }
  //
};
