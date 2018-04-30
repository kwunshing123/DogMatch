import alt from '../alt';
import DatingListActions from '../actions/DatingListActions';

class DatingListStore {
  constructor() {
    this.bindActions(DatingListActions);
    this.datings = [];
    this.pageCount = 0;
  }

  onGetDatingSuccess(data) {
    this.setState({ datings: data.result, pageCount: Math.ceil(data.total / 10) });
  }

  onGetDatingFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(DatingListStore);
