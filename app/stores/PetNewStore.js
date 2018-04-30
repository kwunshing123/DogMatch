import alt from '../alt';
import PetNewActions from '../actions/PetNewActions';
import NavbarActions from '../actions/NavbarActions';

class PetNewStore {
  constructor() {
    this.bindActions(PetNewActions);
    this.petId = '';
    this.name = '';
    this.gender = 'Male';
    this.type = '';
    this.introduction = '';
    this.birthday = '';
    this.iconImage = '/img/default.png';
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

  onUpdateInfoSuccess(msg) {
    toastr.success(msg);
    this.setState({name: '', gender: '', type: '', introduction: '', birthday: '',
    iconImage: '/img/default.png'});
    NavbarActions.authenticate();
  }

  onUpdateInfoFail(msg) {
    toastr.error(msg);
  }

  onInvalidInfo() {
    toastr.error("Please enter all information");
  }

}

export default alt.createStore(PetNewStore);
