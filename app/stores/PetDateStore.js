import alt from '../alt';
import PetDateActions from '../actions/PetDateActions';

class PetDateStore {
  constructor() {
    this.bindActions(PetDateActions);
    this.petId = '';
    this.petOwnerId = '';
    this.name = '';
    this.gender = '';
    this.type = '';
    this.address = '';
    this.message = '';
    this.start = '';
    this.end = '';
    this.date = '';
  }

  onUpdateAddress(event) {
    this.setState({address: event.target.value});
  }

  onUpdateMessage(event) {
    this.setState({message: event.target.value});
  }

  onUpdateStart(event) {
    this.setState({start: event.target.value});
  }

  onUpdateEnd(event) {
    this.setState({end: event.target.value});
  }

  onUpdateDate(event) {
    this.setState({date: event.target.value});
  }

  onGetInfoSuccess(data) {
    if(data.owned) {
      toastr.error("You cannot date yourself");
    } else {
      this.setState({ petId: data.petInfo.petId, gender: data.petInfo.gender,
      name: data.petInfo.name, type: data.petInfo.type, petOwnerId: data.petInfo.petOwnerId});
    }
  }

  onGetInfoFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onPostInvitationSuccess(msg) {
    this.setState({ address: '', message: '', start: '', end: '', date: ''});
    toastr.success(msg);
  }

  onPostInvitationFail(msg) {
    toastr.error(msg);
  }

  onInvalidInfo() {
    toastr.error("Please enter all information");
  }

  onInvalidDate() {
    toastr.error("Invalid date");
  }

}

export default alt.createStore(PetDateStore);
