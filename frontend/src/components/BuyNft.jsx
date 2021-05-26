import React from "react";
import DisplayModel from "./DisplayModel";
import PopUp from "./PopUp";

//prendere un'instanza specifica di NFT e mostrarla + pulsante buy (collegamento al contratto)

class BuyNft extends React.Component {
  async componentDidMount() {
    const x = this.props.data;
    // get contratto dall'url
    const authResult = new URLSearchParams(window.location.search);
    const nft = authResult.get("nft");
    //console.log(nft)

    const web3 = this.props.data.web3;
    if (
      x.account !== "" &&
      x.abi_nft_model !== null &&
      nft != null &&
      x.web3 != null
    ) {
      console.log("aaaaa");
      try {
        console.log(this.props);
        new web3.eth.Contract(x.abi_nft_model, nft);
      } catch (error) {
        alert("contratto non esistente");
        return;
      }
      let contract = new web3.eth.Contract(x.abi_nft_model, nft);
      this.setState({ contract: contract });
      let nome = await contract.methods.getNome().call();
      let lastid = await contract.methods.getLastId().call();
      let minBlocco = await contract.methods.getMinutiBlocco().call();
      let limiteMessaggi = await contract.methods.getLimiteMex().call();
      let limiteMint = await contract.methods.getLimiteMint().call();
      let costo = await contract.methods.getCosto().call();
      let gRisp = await contract.methods.getGaranziaRisposta().call();
      let creatore = await contract.methods.getCreatore().call();
      //let scadenza
      let js = {
        full: true,
        nome: nome,
        lastid: lastid,
        minBlocco: minBlocco,
        costo: costo,
        limiteMessaggi: limiteMessaggi,
        limiteMint: limiteMint,
        gRisp: gRisp,
        creatore: creatore,
        contract: nft,
      };
      this.setState({ contract_nft: js });
      console.log(js);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      contract_nft: null,
      contract: null,
      modal: false,
      primoMex: "",
      modalInputName: ""
    };
  }

  sendTransition = (e) => {
    let contract = this.state.contract;


    contract.methods
      .compraNft("ciaooooo")
      .send({
        from: this.props.data.account,
        value: this.state.contract_nft.costo,
      })
      .on("receipt", (receipt) => {
        let contract_nft = this.state.contract_nft;
        contract_nft.lastid = parseInt(contract_nft.lastid) + 1;
        this.setState({contract_nft:contract_nft});
        alert("transazione ricevuta");
        console.log("receipt:" + receipt);
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        //alert("transazione confermata")
        console.log(
          "confirmationNumber:" + confirmationNumber + " receipt:" + receipt
        );
        console.log(receipt);
      })
      .on("error", function (error) {
        alert(
          "transazione non completata ci sono stati degli errori causa:\n" +
            error.stack
        );

        console.log(error.stack);
      });

  };

    // funzioni popUp

    handleChange(e) {
    const target = e.target;
    const primoMex = target.primoMex;
    const value = target.value;

    this.setState({
        [primoMex]: value
    });
    }

    handleSubmit(e) {
    this.setState({ primoMex: this.state.modalInputName });
    this.modalClose();
    }

    modalOpen() {
    this.setState({ modal: true });
    }

    modalClose() {
    this.setState({
        modalInputName: "",
        modal: false
    });
    }
    //////

  render() {
    return (
      <div className="home">
        <div className="container">
        <PopUp show={this.state.modal} handleClose={e => this.modalClose(e)}>
            <h2>Inserisci il primo messaggio che vuoi mandare:</h2>
            <div className="form-group">
                <label>Cosa stai pensando...</label>
                <input
                type="text"
                value={this.state.primoMex}
                onChange={e => this.setState({ primoMex: e.target.value })} 
                className="form-control"
                />
            </div>
            <div className="form-group">
                <button onClick={e => {this.sendTransition()
                                        this.modalClose(e)}} type="button">
                Compra
                </button>
            </div>
        </PopUp>

          <DisplayModel item={this.state.contract_nft} />
        </div>
        <div className="card-body">
          <button onClick={e => this.modalOpen(e)} className="card-link">
            Compra
          </button>
          <a href="./#" className="card-link">
            Another link
          </a>
        </div>
      </div>
    );
  }
}
//<a href="javascript:;" onClick={this.sendTransition} className="card-link">Compra</a>

export default BuyNft;
