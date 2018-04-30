import alt from '../alt';
import PetCommentsActions from '../actions/PetCommentsActions';

class PetCommentsStore {
  constructor() {
    this.bindActions(PetCommentsActions);
    this.comments = [];
    this.commentsOffset = 0;
    this.commentsPageCount = 0;
  }

  onGetPetCommentsSuccess(data) {
    this.setState({comments: data.results, commentsPageCount: Math.ceil(data.total / 5)});
  }

  onGetPetCommentsFail(jqXhr) {
    toastr.error(jqXhr);
  }

}

export default alt.createStore(PetCommentsStore);
