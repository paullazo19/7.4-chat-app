import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import Serialize from 'form-serialize'
import App from './App'

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
    e.preventDefault();
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
        <form method="POST" ref="messageForm" action="#" onSubmit={this.handleSubmitForm}>
          <input ref="input" className="log__message--input" type="text" name="message" placeholder="add message" autoComplete="off"/>
        </form>
        <ul className="log">
          <li className="log__message">
            <span className="log__guest">guest 1</span><span className="log__newChannel">joined #new-channel</span>
          </li>
          {this.state.messages.map((message, i)=> {
            return <li key={i} className="log__message" data-id={message._id}>
                      <span className="log__guest">guest 1</span>
                      <span className="log__message--display">{message.message}</span>&nbsp;
                      <i onClick={this.handleMessageDelete} className="fa fa-times-circle log__message--delete" aria-hidden="true"></i>
                    </li>
          }, this)}
        </ul>
      </article>
    )
  }
})
