import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import Serialize from 'form-serialize'

export default React.createClass({
  getInitialState(){
    return {
      comments: []
    }
  },
  getDefaultProps(){
    return {
      source: "http://tiny-tiny.herokuapp.com/collections/paul_chat_19"
    }
  },
  componentDidMount(){
    $.get(this.props.source, (resp)=> {
      this.setState({comments:resp})
    });

    // setInterval(()=> {
    //   $.get(this.props.source, (resp)=> {
    //     this.setState({comments:resp})
    //   });
    // }, 2000);
  },
  handleSubmitForm(e){
    e.preventDefault();
    var serializedForm = Serialize(this.refs.commentForm, {hash: true})
    $.post(this.props.source, serializedForm, (resp)=> {
      $.get(this.props.source, (resp)=> {
        this.setState({comments:resp});

        // clear text after input
        this.refs.input.value="";
      });
    });

  },
  handleCommentDelete(e){
    var commentId = ReactDOM.findDOMNode(e.target).parentNode.dataset.id;
    $.ajax({
      url: `${this.props.source}/${commentId}`,
      method: "DELETE",
      dataType: "JSON",
      success: (resp)=> {
        $.get(this.props.source, (resp)=> {
          this.setState({comments:resp})
        })
      }
    })
  },
  render() {
    return (
      <article className="chatInterface">
        <form method="POST" ref="commentForm" action="#" onSubmit={this.handleSubmitForm}>
          <input ref="input" className="log__comment--input" type="text" name="comment" placeholder="add comment" autoComplete="off"/>
        </form>
        <ul className="log">
          <li className="log__comment">
            <span className="log__guest">guest 1</span><span className="log__newChannel">joined #new-channel</span>
          </li>
          {this.state.comments.map((comment, i)=> {
            return <li key={i} className="log__comment" data-id={comment._id}>
                      <span className="log__guest">guest 1</span>
                      <span className="log__comment--display">{comment.comment}</span>&nbsp;
                      <i onClick={this.handleCommentDelete} className="fa fa-times-circle log__comment--delete" aria-hidden="true"></i>
                    </li>
          }, this)}
        </ul>
      </article>
    )
  }
})
