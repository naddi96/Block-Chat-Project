import React from "react";
import { Link } from "react-router-dom";
class ChatListBuyer extends React.Component {
  async componentDidMount() {
    this.setState({ account: this.props.account });

    let contract = this.props.contract;
    let chat_list = await contract.methods
      .getNftComprati(this.props.account)
      .call();
    this.setState({ chat_list: chat_list });
    console.log(chat_list);
  }

  constructor(props) {
    super(props);
    this.state = {
      chat_list: [],
    };
  }

  render() {
    return (
      <div>
        <div class="messages-box">
          <div class="list-group rounded-0">
            {this.state.chat_list.map((message, index) => {
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
                                src="https://pbs.twimg.com/profile_images/1280515721286619136/r35mYqRK.jpg"
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
