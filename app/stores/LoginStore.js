import alt from '../alt';
import LoginActions from '../actions/LoginActions';
import NavbarActions from '../actions/NavbarActions';

class LoginStore {
  constructor() {
    this.bindActions(LoginActions);
    this.email = '';
    this.password = '';
  }

  onLoginSuccess(data) {
    NavbarActions.authenticate();
    NavbarActions.getUnreadNotification();
    LoginActions.redirectToHome();
  }

  onLoginFail(errorMessage) {
    toastr.error(errorMessage);
  }

  onUpdateEmail(event) {
    this.email = event.target.value;
  }

  onUpdatePassword(event) {
    this.password = event.target.value;
  }

}

export default alt.createStore(LoginStore);
