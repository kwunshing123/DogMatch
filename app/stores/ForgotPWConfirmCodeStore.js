import alt from '../alt';
import ForgotPWConfirmCodeActions from '../actions/ForgotPWConfirmCodeActions';

class ForgotPWConfirmCodeStore {
  constructor() {
    this.bindActions(ForgotPWConfirmCodeActions);
    this.newPassword = '';
    this.newPassword1 = '';
  }

  onUpdateNewPassword(event) {
    this.newPassword = event.target.value;
  }

  onUpdateNewPassword1(event) {
    this.newPassword1 = event.target.value;
  }

  onInvalidPassword(msg){
    toastr.warning(msg);
  }

  onModifyPasswordSuccess(msg){
    toastr.success(msg);
    this.newPassword = '', this.newPassword1 = '';
  }

  onModifyPasswordFail(msg){
    toastr.error(msg);
  }

  onInvalidPasswordLengthOrCharacter(){
    toastr.warning('The password required at least 6 characters or digital');
  }

}

export default alt.createStore(ForgotPWConfirmCodeStore);
