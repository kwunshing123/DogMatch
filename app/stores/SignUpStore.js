import alt from '../alt';
import SignUpActions from '../actions/SignUpActions';

class SignUpStore {
  constructor() {
    this.bindActions(SignUpActions);
    this.email = '';
    this.password = '';
    this.password1 = '';
    this.agree = false;
  }

  onSignUpSuccess(successMessage) {
    this.email = '';
    this.password = '';
    this.password1 = '';
    this.agree = false;
    toastr.success(successMessage);
  }

  onSignUpFail(errorMessage) {
    toastr.error(errorMessage);
  }

  onUpdateEmail(event) {
    this.email = event.target.value;
  }

  onUpdatePassword(event) {
    this.password = event.target.value;
  }

  onUpdatePassword1(event) {
    this.password1 = event.target.value;
  }

  onUpdateAgree(event) {
    this.agree = !this.agree;
  }

  onInvalidEmail() {
    toastr.error('Please enter a email.');
  }

  onInvalidPassword(){
    toastr.error('The password does not match. Please enter the password again.');
  }

  onInvalidPasswordLengthOrCharacter(){
    toastr.error('The password required at least 6 characters or digital');
  }

}

export default alt.createStore(SignUpStore);
