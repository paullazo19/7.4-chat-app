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

      <form method="POST" ref="messageForm" action="#" onSubmit={this.props.handleSubmitForm}>
        <input ref="input" className="log__message--input" type="text" name="message" placeholder="add message" autoComplete="off"/>
      </form>

    )
  }
})
