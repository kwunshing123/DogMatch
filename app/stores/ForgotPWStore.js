import alt from '../alt';
import ForgotPWActions from '../actions/ForgotPWActions';

class ForgotPWStore {
  constructor() {
    this.bindActions(ForgotPWActions);
    this.email = '';
  }

  onSubmitSuccess(successMessage) {
    this.email = '';
    toastr.success(successMessage);
  }

  onSubmitFail(errorMessage) {
    toastr.error(errorMessage);
  }

  onUpdateEmail(event) {
    this.email = event.target.value;
  }
}

export default alt.createStore(ForgotPWStore);
