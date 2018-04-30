import alt from '../alt';

class CommentActions {
  constructor() {
    this.generateActions(
      'updateComment',
      'invalidInfo',
      'postCommentSuccess',
      'postCommentFail'
    );
  }

  postComment(data) {
    $.ajax({
      type: 'POST',
      url: '/api/comment/post',
      data: {petId: data.petId, comment: data.comment}
    })
    .done((data) => {
      this.actions.postCommentSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.postCommentFail(jqXhr.responseJSON.message);
    });
  }

}

export default alt.createActions(CommentActions);
