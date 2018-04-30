import alt from '../alt';
import NavbarActions from '../actions/NavbarActions';

class NavbarStore {
  constructor() {
    this.bindActions(NavbarActions);
    this.ajaxAnimationClass = '';
    this.isAuthorized = false;
    this.userName = '';
    this.petId = null;
    this.pets = [];
    this.unreadNotification = 0;
  }

  onUpdateAjaxAnimation(className) {
    this.setState({ajaxAnimationClass: className});
  }

  onAuthenticateSuccess(data) {
    NavbarActions.getUnreadNotification();
    this.setState({isAuthorized: true, petOwnerId: data.petOwnerId, userName: data.userName, petId: data.petId});
    NavbarActions.getMyPets(0, 5);
  }

  onAuthenticateFail(msg) {
    this.setState({isAuthorized: false});
    toastr.error(msg);
  }

  onLogoutSuccess(message) {
    this.setState({isAuthorized: false});
    toastr.success(message);
  }

  onGetUnreadNotificationSuccess(data) {
    this.setState({unreadNotification: data.total});
  }

  onGetUnreadNotificationFail(msg) {
    toastr.error(msg);
  }

  onGetMyPetsSuccess(data) {
    this.setState({pets: data.results});
  }

  onGetMyPetsFail(msg) {
    toastr.error(msg);
  }

  onGetMyPetsSuccess(data) {
    this.setState({pets: data.results});
  }

  onGetMyPetsFail(msg) {
    toastr.error(msg);
  }

  onChangesPetSuccess(data) {
    NavbarActions.authenticate();
  }

  onChangesPetFail(msg) {
    toastr.error(msg);
  }

}

export default alt.createStore(NavbarStore);
