import alt from '../alt';
import AttendedPartiesActions from '../actions/AttendedPartiesActions';
import NavbarStore from '../stores/NavbarStore';

class AttendedPartiesStore {
  constructor() {
    this.bindActions(AttendedPartiesActions);
    this.isAuthorized = false;
    this.petId = 'undefined';
    this.parties = [];
    this.partiesOffset = 0;
    this.partiesPageCount = 0;
  }

  onGetAttendedPartiesSuccess(data) {
    this.setState({ parties: data.results, isAuthorized: NavbarStore.getState().isAuthorized,
    partiesPageCount: Math.ceil(data.total / 4) });
  }

  onGetAttendedPartiesFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

}

export default alt.createStore(AttendedPartiesStore);
