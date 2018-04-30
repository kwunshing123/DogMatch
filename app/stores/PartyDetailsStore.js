import alt from '../alt';
import PartyDetailsActions from '../actions/PartyDetailsActions';
import PartyAttendantsActions from '../actions/PartyAttendantsActions';

class PartyDetailsStore {
  constructor() {
    this.bindActions(PartyDetailsActions);
    this.partyId = 'undefined';
    this.name = 'undefined';
    this.date = 'undefined';
    this.start = 'undefined';
    this.end = 'undefined';
    this.attendants = [];
    this.address = 'undefined';
    this.fee = 'undefined';
    this.organizer = 'undefined';
    this.petOwnerId = null;
    this.condition = {};
    this.remarks = [];
    this.logined = false;
    this.status = null;
    this.attended = false;
  }

  onGetPartyDetailsSuccess(data) {
    this.setState({ partyId: data.partyId, name: data.name, date: data.date, start: data.start,
    end: data.end, attendants: data.attendants, address: data.address, fee: data.fee,
    organizer: data.organizer, condition: data.condition, remarks: data.remarks,
    attended: data.attended, status: data.status, logined: data.logined,
    petOwnerId: data.petOwnerId});
  }

  onGetPartyDetailsFail(msg) {
    toastr.error(msg);
  }

  onAttendPartySuccess(data) {
    this.setState({attended: true});
    PartyAttendantsActions.getAttedants(data.attendedPartyId, 0, 3);
    toastr.success(data.message);
  }

  onAttendPartyFail(msg) {
    toastr.error(msg);
  }

}

export default alt.createStore(PartyDetailsStore);
