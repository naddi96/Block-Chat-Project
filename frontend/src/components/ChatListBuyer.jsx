
import React from "react";
import { Link } from "react-router-dom";
class ChatListBuyer extends React.Component {
    async componentDidMount() {
        
        this.setState({account:this.props.account})
        
        let contract=this.props.contract
        let  chat_list =await contract.methods.getNftComprati(this.props.account).call()
        this.setState({chat_list:chat_list})
        console.log(chat_list)
        
    }
    
        constructor(props) {
    
            super(props)
            this.state = {
                chat_list:[],
            }
          }

    render() {
        return (

            <div>





                <div class="messages-box">
                    <div class="list-group rounded-0">

                    {this.state.chat_list.map( (message, index) => {
                    return (
                        <Link to={"/chat?nft="+message.nft_contract+"&id="+message.id}>
                        <div class="itemchat" >
                        <div class="list-group-item list-group-item-action active text-white rounded-0">
                            <div class="media">
                                <div class="media-body ml-4">
                                    <div class="d-flex align-items-center justify-content-between mb-1">
                                        <h6 class="mb-0">{message.nome}</h6><small class="small font-weight-bold">id: {message.id}</small>
                                    </div>
                                    <p class="font-italic mb-0 text-small">nft: {message.nft_contract}</p>
                                </div>

                            </div>

                        </div>
                    </div>
                    </Link>
                    )})}

            
                    </div>
                </div>
            </div>
















        )

    }

}

export default ChatListBuyer;
