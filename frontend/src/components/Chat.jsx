
import React from "react";

/** Replace these with your own API keys, username and roomId from Chatkit  */

const username = 'perborgen'
const roomId = 9806194
class Chat extends React.Component {
    constructor() {
        super()
        this.state = {
            messages: [{
            text:"prova",
            css:"othermex"
        },
        {
            text:"prova",
            css:"othermex"
        },
        {
            css:"mymex",
            text:"prova",
           },
            {
            css:"mymex",
            text:"prova",
           },
        ]
        }
        this.sendMessage = this.sendMessage.bind(this)
    } 
    
    componentDidMount() {
        
        
    }    
    
    sendMessage(text) {
        
        
        this.setState({
            messages:this.state.messages.concat([{
             css:"mymex",
            text:text,
            roomId:roomId,    
        }])
  
        })
    }
    
    render() {
        return (
            <div className="app">
              
              <MessageList 
                  roomId={this.state.roomId}
                  messages={this.state.messages} />
              <SendMessageForm
                  sendMessage={this.sendMessage} />
            </div>
        );
    }
}

class MessageList extends React.Component {
    render() {
        return (
            <ul className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                    <div className="mexContainer">
                      <div  key={message.id} className={message.css}>
                      <div>{message.senderId}</div>
                        
                        <div className="msg-text">{message.text}</div>
                      </div>
                      </div>
                    )
                })}
            </ul>
        )
    }
}

class SendMessageForm extends React.Component {
    constructor() {
        super()
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }
    
    handleSubmit(e) {
        e.preventDefault()
        this.props.sendMessage(this.state.message)
        this.setState({
            message: ''
        })
    }
    
    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="send-message-form">
                <input
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="Type your message and hit ENTER"
                    type="text" />
            </form>
        )
    }
}

function Title() {
  return <p className="title">My awesome chat app</p>
}


export default Chat;
