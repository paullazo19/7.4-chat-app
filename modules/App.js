import React from 'react'
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
        this.setState({comments:resp})
      });
    })
  },
  handleCommentDelete(e){
    var commentId = $(e.target).closest(".log__comment").data("id");
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
          <input className="log__comment--input" type="text" name="comment" placeholder="add comment" autoComplete="off"/>
        </form>
        <ul className="log">
          <li className="log__comment">
            <span className="log__guest">guest 1</span><span className="log__newChannel">joined #new-channel</span>
          </li>
          {this.state.comments.map((comment)=> {
            return <li className="log__comment" data-id={comment._id}>
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
