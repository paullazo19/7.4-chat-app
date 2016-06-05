import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import Serialize from 'form-serialize'
import App from './App'
import Chat from './Chat'

export default React.createClass({
  getInitialState(){
    return {
      messages: []
    }
  },
  getDefaultProps(){
    return {
      messageSource: "http://tiny-tiny.herokuapp.com/collections/paullazo_chat_messages"
    }
  },

  render() {
    return (

      <ul className="log">
        <li className="log__message">
          <span className="log__guest">guest 1</span><span className="log__newChannel">joined #new-channel</span>
        </li>
        {this.props.messages.map((message, i)=> {
          return <li key={i} className="log__message" data-id={message._id}>
                    <span className="log__guest">guest 1</span>
                    <span className="log__message--display">{message.message}</span>&nbsp;
                    <i onClick={this.props.handleMessageDelete} className="fa fa-times-circle log__message--delete" aria-hidden="true"></i>
                  </li>
        }, this)}
      </ul>

    )
  }
})
