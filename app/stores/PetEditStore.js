import alt from '../alt';
import PetEditActions from '../actions/PetEditActions';

class PetEditStore {
  constructor() {
    this.bindActions(PetEditActions);
    this.petId = '';
    this.name = '';
    this.gender = 'Male';
    this.type = '';
    this.introduction = '';
    this.birthday = '';
    this.iconImage = null;
  }

  onUpdateName(event) {
    this.setState({name: event.target.value});
  }

  onUpdateGender(event) {
    this.setState({gender: event.target.value});
  }

  onUpdateType(event) {
    this.setState({type: event.target.value});
  }

  onUpdateIntroduction(event) {
    this.setState({introduction: event.target.value});
  }

  onUpdateBirthday(event) {
    this.setState({birthday: event.target.value});
  }

  onUpdateIconImage(event) {
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({ iconImage: reader.result });
    }
    reader.readAsDataURL(file)
  }

  onGetInfoSuccess(data) {
    if(!data.owned) return toastr.error("Error occurred");
    this.setState({ petId: data.petInfo.petId, gender: data.petInfo.gender,
    name: data.petInfo.name, type: data.petInfo.type, introduction: data.petInfo.introduction,
    birthday: data.petInfo.birthday, iconImage: data.petInfo.iconImage });
  }

  onGetInfoFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onUpdateInfoSuccess(msg) {
    toastr.success(msg);
  }

  onUpdateInfoFail(msg) {
    toastr.error(msg);
  }

  onInvalidInfo() {
    toastr.error("Please enter all information");
  }

  onUpdateImageSuccess(data) {
    location.reload();
  }

  onUpdateImageFail(msg) {
    toastr.error(msg);
  }

}

export default alt.createStore(PetEditStore);
