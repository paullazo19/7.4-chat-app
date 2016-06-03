import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import $ from 'jquery'
import Serialize from 'form-serialize'

export default React.createClass({
  getDefaultProps(){
    return {
      userSource: "http://tiny-tiny.herokuapp.com/collections/paullazo_chat_users"
    }
  },
  handleSignUpForm(e){
    e.preventDefault();
    var serializedForm = Serialize(this.refs.userForm, {hash: true})
    $.post(this.props.userSource, serializedForm, (resp)=> {
      browserHistory.push('/chat')
    });
  },
  render() {
    return (
      <form method="POST" ref="userForm" action="#" onSubmit={this.handleSignUpForm}>
        <input ref="username" className="log__username--input" type="text" name="username" placeholder="create username" autoComplete="off"/>
      </form>

    )
  }
})
