import React from "react";
import { Link } from "react-router-dom";
import { get_image } from "./requestsAPI";
import PopUp from "./PopUp";

class ChatListBuyer extends React.Component {
  async componentDidMount() {

    let contract = this.props.contract;
    let chat_list = await contract.methods
      .getNftComprati(this.props.account)
      .call();
    this.setState({ chat_list: chat_list });
    //console.log(chat_list);
}

  constructor(props) {
    super(props);
    this.state = {
      chat_list: [],
      address_dest : "",
      id_scambio : "",
      modal: false,
      nft_scambio : null,
      modalInputName: ""
    };
  
    
  }

  sendTransition = (e) => {
    const web3 = this.props.web3;
    if (
      this.props.account !== "" &&
      this.props.abi_nft_model !== null &&
      this.state.nft_scambio != null &&
      this.props.web3 != null
    ) {
      try {
        //console.log(this.props);
        console.log(this.props.abi_nft_model)
        console.log(this.state.nft_scambio)
        new web3.eth.Contract(this.props.abi_nft_model, this.state.nft_scambio);
      } catch (error) {
        alert("contratto non esistente");
        return;
      }
      let contract = new web3.eth.Contract(this.props.abi_nft_model, this.state.nft_scambio);
    
    console.log(contract)
    if (this.state.address_dest === ""){
      alert("inserisci l'address del destinatario")
      return
    }
    contract.methods.transferFrom(this.props.account, this.state.address_dest, this.state.id_scambio).call();
    console.log(this.props.account);
    // let puzza = contract.methods.ownerOf(this.state.id_scambio)[0]
    // console.log(puzza)
  
    }
};
    // funzioni popUp

    handleChange(e) {
      const target = e.target;
      const address_dest = target.address_dest;
      const value = target.value;
  
      this.setState({
          [address_dest]: value
      });
      }
  
      handleSubmit(e) {
      this.setState({ address_dest: this.state.modalInputName });
      this.modalClose();
      }
  
      modalOpen(e, id_scambio, nft_scambio) {
      this.setState({ modal: true });
      this.setState({id_scambio : id_scambio});
      this.setState({nft_scambio : nft_scambio});
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
      <div>
        <PopUp show={this.state.modal} handleClose={(e) => this.modalClose(e)}>
          <h2>Inserisci l'address a cui vuoi inviare il token:</h2>
          <div className="form-group">
            <input
              type="text"
              value={this.state.address_dest}
              onChange={(e) => this.setState({ address_dest: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <button
              className="compra-button"
              onClick={(e) => {
                this.sendTransition();
                this.modalClose(e);
              }}
              type="button"
            >
              Scambia
            </button>
          </div>
        </PopUp>
        <div class="messages-box">
          <div class="list-group rounded-0">
            {this.state.chat_list.map((message,) => {
              return (
                <Link
                  to={"/chat?nft=" + message.nft_contract + "&id=" + message.id}
                >
                  
                  <div class="itemchat">
                    <div class="list-group-item list-group-item-action active text-white">
                      <div class="media">
                        <div class="media-body ml-4">
                          <div class="info-item">
                            <div class="token-img">
                              <img
                                src={get_image(message.nft_contract)}
                                alt="..."
                              />
                            </div>
                            <h6 class="mb-0">{message.nome}</h6>
                            <small class="small font-weight-bold">
                              id: {message.id}
                            </small>
                            <p class="font-italic mb-0 text-small">
                              Token: {message.nft_contract}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Link>
                      <button
                        className="scambia-button"
                        onClick={(e) => this.modalOpen(e, message.id, message.nft_contract)}
                      >
                        Scambia
                      </button>
                      </Link>
                    </div>

                    {/* <div className="contract-info">
                      <div class="table-responsive-sm">
                        <table className="table table-borderless">
                          <thead>
                            <tr>
                              <th scope="col">Nome nft</th>
                              <th scope="col">Messaggi rimasti</th>
                              <th scope="col">Minuti blocco</th>
                              <th scope="col">id</th>
                              <th scope="col">Scadenza</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>provaaaaaa</td>
                              <td>3</td>
                              <td>3</td>
                              <td>3</td>
                              <td>2/05/2020</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div> */}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ChatListBuyer;
