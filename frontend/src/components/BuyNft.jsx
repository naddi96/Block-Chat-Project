import React from "react";
import DisplayModel from "./DisplayModel";
import PopUp from "./PopUp";
import Units from "ethereumjs-units";

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
      let nft_info = await contract.methods.getNftInfo().call();
      console.log(nft_info)
      //let lastid = await contract.methods.getLastId().call();
      let nome=nft_info.nome_modello
      let lastid=nft_info.last_id
      let minBlocco = nft_info.minuti_blocco
      let limiteMessaggi =nft_info.limite_messaggi
      let limiteMint = nft_info.limite_mint
      let costo = nft_info.costo
      let creatore = nft_info.pub_key_creatore
      let scadenza_timestamp =parseInt(nft_info.tempo_validita)+parseInt(nft_info.timestamp_creation)
      let creazione = nft_info.timestamp_creation
      
      //let scadenza
      
      
      let js = {
        full: true,
        data_creazione:this.formattedDate(new Date(creazione*1000)),
        data_scadenza:this.formattedDate(new Date(scadenza_timestamp*1000)),
        nome: nome,
        lastid: lastid,
        minBlocco: minBlocco,
        eth:Units.convert(costo, 'wei', 'eth'),
        wei:costo,
        limiteMessaggi: limiteMessaggi,
        limiteMint: limiteMint,
       // gRisp: gRisp,
        creatore: creatore,
        contract: nft,
      };
      this.setState({ contract_nft: js });
      console.log(js);
    }
  }

  formattedDate(date) {
    return [date.getDate(), date.getMonth()+1, date.getFullYear()]
        .map(n => n < 10 ? `0${n}` : `${n}`).join('/');
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

    if (this.state.primoMex === ""){
      alert("inserisci il primo messaggio ")
      return
    }
    contract.methods
      .compraNft(this.state.primoMex)
      .send({
        from: this.props.data.account,
        value: this.state.contract_nft.wei,
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
                <button className="compra-button"  onClick={e => {this.sendTransition()
                                        this.modalClose(e)}} type="button">
                Compra
                </button>
            </div>
        </PopUp>

          <DisplayModel item={this.state.contract_nft} />
        </div>
          
          <button className="compra-button" onClick={e => this.modalOpen(e)}>
            Compraaaa
          </button>
      
        
      </div>
    );
  }
}

export default BuyNft;
