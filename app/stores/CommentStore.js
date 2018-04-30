import alt from '../alt';
import CommentActions from '../actions/CommentActions';
import PetCommentsActions from '../actions/PetCommentsActions';

class CommentStore {
  constructor() {
    this.bindActions(CommentActions);
    this.comment = '';
  }

  onUpdateComment(event) {
    this.setState({comment: event.target.value});
  }

  onInvalidInfo() {
    toastr.warning("Please enter the comment");
  }

  onPostCommentSuccess(data) {
    this.setState({comment: ''});
    toastr.success(data.message);
    PetCommentsActions.getPetComments(data.petId, 0, 5);
  }

  onPostCommentFail(msg) {
    toastr.error(msg);
  }

}

export default alt.createStore(CommentStore);
