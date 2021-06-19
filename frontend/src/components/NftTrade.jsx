import React from "react";
import { Link } from "react-router-dom";
import Nft_model from "../build/contracts/NFT_MODEL.json";

class NftTrade extends React.Component {
  async componentDidMount() {
    const x = this.props.data;
    if (
      x.account !== "" &&
      x.abi_nft_model !== null &&
      x.contract_block_chat !== null
    ) {
      x.contract_block_chat.events.ModelloNftCreato(
        { fromBlock: 0 },
        this.load_nft_model_event
      );
    }
  }

  load_nft_model_event = (error, event) => {
    //console.log("aaa")
    let nome = event.returnValues.nome_modello;
    let contratto = event.returnValues.indirizzo_contratto;
    let js = { nome: nome, contract: contratto };
    let stato = this.state.list_nft_models;
    this.setState({ list_nft_models: [js].concat(stato) });
  };

  constructor(props) {
    super(props);
    this.state = {
      list_nft: [],
    };
  }

  render() {
    return (
      <ListNft
        account={this.props.account}
        web3={this.props.data.web3_istance}
      />
    );
  }
}

class ListNft extends React.Component {
  async componentDidMount() {
    const authResult = new URLSearchParams(window.location.search);
    const nft = authResult.get("nft");
    if (nft != null) {
      await this.carica_contratto(nft);
      this.setState({ nft: nft });
    }
  }

  async carica_contratto(nft) {
    let abi = Nft_model.abi;
    let web3 = this.props.web3;
    let contract = new web3.eth.Contract(abi, nft);
    let nft_info = await contract.methods.getNftInfo().call();
    let lastid = nft_info.last_id;
    let nome = nft_info.nome_modello;
    this.setState({
      lastid: lastid,
      nome: nome,
    });
  }

  constructor() {
    super();
    this.state = {
      lastid: 0,
      nft: null,
      nome: "",
    };
  }

  render() {
    var elements = [];
    for (var i = 1; i <= this.state.lastid; i++) {
      elements.push(
        // TODO: linkare alla pagina di scambio non di acquisto
        // TODO: fare display dei soli nft in vendita
        <div class="itemtrade">
          <Link to={"/BuyNft?nft=" + this.state.nft + "&id=" + i}>
            <div class="list-group-item list-group-item-action active text-white trade-list">
              <div class="info-item">
                <h6 class="mb-0">id: {i}</h6>
              </div>
            </div>
          </Link>
        </div>
      );
    }

    return (
      <div>
        <h6 class="mb-0 text-white text-big">
          Nft disponibili per modello "{this.state.nome}"
        </h6>
        <h5 class="mb-0 text-white">({this.state.nft})</h5>
        <div class="market-box">
          <div class="market-list">{elements}</div>
        </div>
      </div>
    );
  }
}

export default NftTrade;
