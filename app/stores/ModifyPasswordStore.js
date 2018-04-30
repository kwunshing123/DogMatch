import alt from '../alt';
import ModifyPasswordActions from '../actions/ModifyPasswordActions';

class ModifyPasswordStore {
  constructor() {
    this.bindActions(ModifyPasswordActions);
    this.oldPassword = '';
    this.newPassword = '';
    this.newPassword1 = '';
  }

  onUpdateOldPassword(event) {
    this.oldPassword = event.target.value;
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
    this.oldPassword = '', this.newPassword = '', this.newPassword1 = '';
  }

  onModifyPasswordFail(msg){
    toastr.error(msg);
  }

  onInvalidPasswordLengthOrCharacter(){
    toastr.warning('The password required at least 6 characters or digital');
  }

}

export default alt.createStore(ModifyPasswordStore);
