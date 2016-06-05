import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import Serialize from 'form-serialize'
import App from './App'
import MessageInput from './MessageInput'
import MessageList from './MessageList'

export default React.createClass({
  getInitialState(){
    return {
      messages: [],
      users: [],
      latestUser: ""
    }
  },
  getDefaultProps(){
    return {
      messageSource: "http://tiny-tiny.herokuapp.com/collections/paullazo_chat_messages",
      userSource: "http://tiny-tiny.herokuapp.com/collections/paullazo_chat_users"
    }
  },
  getMessages(){
    $.get(this.props.messageSource, (resp)=> {
      this.setState({messages:resp})
    });
  },
  getUsers(){
    $.get(this.props.userSource, (resp)=> {
      this.setState({users:resp})
      this.setState({latestUser:this.state.users[0].username})
    });
  },
  componentDidMount(){
    this.getMessages();
    this.getUsers();
    setInterval(()=> {
      this.getMessages();
      this.getUsers();
    }, 2000);

  },
  handleSubmitForm(e){
    // e.preventDefault();
    var serializedForm = Serialize(this.refs.messageForm, {hash: true})
    $.post(this.props.messageSource, serializedForm, (resp)=> {
      this.getMessages();
      // clear text after input
      this.refs.input.value="";
    });
  },
  handleMessageDelete(e){
    var messageId = ReactDOM.findDOMNode(e.target).parentNode.dataset.id;
    $.ajax({
      url: `${this.props.messageSource}/${messageId}`,
      method: "DELETE",
      dataType: "JSON",
      success: (resp)=> {
        this.getMessages();
      }
    })
  },
  render() {
    return (
      <article className="chatInterface">
        <MessageInput handleSubmitForm={this.handleSubmitForm}/>
        <MessageList getMessages={this.getMessages} handleMessageDelete={this.handleMessageDelete}/>
      </article>
    )
  }
})
