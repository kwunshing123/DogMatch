import alt from '../alt';
import OwnerEditActions from '../actions/OwnerEditActions';
import NavbarActions from '../actions/NavbarActions';

class OwnerEditStore {
  constructor() {
    this.bindActions(OwnerEditActions);
    this.petOwnerId = '';
    this.userName = '';
    this.gender = 'Male';
    this.country = '';
    this.iconImage = null;
    this.birthday = '';
  }

  onUpdateUserName(event) {
    this.setState({userName: event.target.value});
  }

  onUpdateGender(event) {
    this.setState({gender: event.target.value});
  }

  onSelectCountry (val) {
    this.setState({country: val});
  }

  onUpdateBirthday(event) {
    this.setState({birthday: event.target.value});
  }

  onGetInfoSuccess(data) {
    if(!data.owned) return toastr.error("Error occurred");
    this.setState({petOwnerId: data.ownerInfo.petOwnerId, gender: data.ownerInfo.gender,
    userName: data.ownerInfo.name, country: data.ownerInfo.country,
    iconImage: data.ownerInfo.iconImage, birthday: data.ownerInfo.birthday});
  }

  onGetInfoFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onUpdateInfoSuccess(msg) {
    toastr.success(msg);
    NavbarActions.authenticate();
  }

  onUpdateInfoFail(msg) {
    toastr.error(msg);
  }

  onInvalidInfo() {
    toastr.error("Please enter all information");
  }

  onUpdateImageSuccess(data) {
    OwnerEditActions.getInfo(data.petOwnerId);
    toastr.success(data.message);
  }

  onUpdateImageFail(msg) {
    toastr.error(msg);
  }

}

export default alt.createStore(OwnerEditStore);
