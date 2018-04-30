import React from 'react';
import CommentStore from '../../stores/CommentStore';
import CommentActions from '../../actions/CommentActions';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = CommentStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CommentStore.listen(this.onChange);
  }

  componentWillUnmount() {
    CommentStore.unlisten(this.onChange);
    $(document.body).removeClass();
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.comment) return CommentActions.invalidInfo();

    if (this.state.comment) {
      let data = {
        petId: this.props.id,
        comment: this.state.comment
      };
      CommentActions.postComment(data);
    }
  }

  render() {

    return (
      <div className='well'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className='form-group'>
            <label className='control-label'>Comment: </label>
            <textarea className="form-control" rows="3" style={{resize: 'none'}} value={this.state.comment} onChange={CommentActions.updateComment}></textarea>
          </div>
          <button type='submit' className='btn btn-info' style={{marginRight: '1em'}}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Comment;
