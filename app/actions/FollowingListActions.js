import alt from '../alt';

class FollowingListActions {
  constructor() {
    this.generateActions(
      'getFollowingSuccess',
      'getFollowingFail'
    );
  }

  getFollowing(offset, qty) {
    $.ajax({ url: '/api/owner/following/' + offset + '/' + qty })
    .done((data) => {
      this.actions.getFollowingSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getFollowingFail(jqXhr);
    });
  }
}

export default alt.createActions(FollowingListActions);
