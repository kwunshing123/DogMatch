import alt from '../alt';
import FollowingListActions from '../actions/FollowingListActions';

class FollowingListStore {
  constructor() {
    this.bindActions(FollowingListActions);
    this.followingPets = [];
    this.pageCount = 0;
  }

  onGetFollowingSuccess(data) {
    this.setState({ followingPets: data.result, pageCount: Math.ceil(data.total / 10) });
  }

  onGetFollowingFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(FollowingListStore);
