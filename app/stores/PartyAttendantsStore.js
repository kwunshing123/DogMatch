import alt from '../alt';
import PartyAttendantsActions from '../actions/PartyAttendantsActions';

class PartyAttendantsStore {
  constructor() {
    this.bindActions(PartyAttendantsActions);
    this.attendants = [];
    this.participantsCount = 0;
  }

  onGetAttendantsSuccess(data) {
    this.setState({ attendants: data.attendants, participantsCount: Math.ceil(data.total / 3) });
  }

  onGetAttendantsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(PartyAttendantsStore);
