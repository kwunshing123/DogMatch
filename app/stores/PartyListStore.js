import alt from '../alt';
import PartyListActions from '../actions/PartyListActions';

class PartyListStore {
  constructor() {
    this.bindActions(PartyListActions);
    this.parties = [];
    this.offset = 0;
    this.pageCount = 0;
  }

  onGetPartiesSuccess(data) {
    this.setState({ parties: data.results, pageCount: Math.ceil(data.total / 10)});
  }

  onGetPartiesFail(jqXhr) {
    toastr.error(jqXhr);
  }

}

export default alt.createStore(PartyListStore);
