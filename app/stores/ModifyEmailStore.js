import alt from '../alt';
import ModifyEmailActions from '../actions/ModifyEmailActions';
import NavbarActions from '../actions/NavbarActions';

class ModifyEmailStore {
  constructor() {
    this.bindActions(ModifyEmailActions);
    this.newEmail = '';
    this.newEmail1 = '';
  }

  onUpdateNewEmail(event) {
    this.newEmail = event.target.value;
  }

  onUpdateNewEmail1(event) {
    this.newEmail1 = event.target.value;
  }

  onModifyEmailSuccess(msg){
    toastr.success(msg);
    NavbarActions.logout();
    this.newEmail = '', this.newEmail1 = '';
  }

  onModifyEmailFail(msg) {
    toastr.error(msg);
  }

}

export default alt.createStore(ModifyEmailStore);
