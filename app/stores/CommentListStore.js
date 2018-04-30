import alt from '../alt';
import {assign, contains} from 'underscore';
import MatchActions from '../actions/MatchActions';

class CommentListStore {
  constructor() {
    this.bindActions(MatchActions);
    this.comments = [];
    this.offset = 0;
    this.pageCount = 0;
  }

  onGetCommentsSuccess(data) {
    this.comments = [];
    assign(this.comments, data);
  }

  onGetCommentsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onGetCountSuccess(data) {
    this.pageCount = Math.ceil(data.total / 5);
  }

  onGetCountFail(jqXhr) {
    toastr.error(jqXhr);
  }
}

export default alt.createStore(CommentListStore);
