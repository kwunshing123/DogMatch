import alt from '../alt';
import ActivateCodeActions from '../actions/ActivateCodeActions';

class ActivateCodeStore {
  constructor() {
    this.bindActions(ActivateCodeActions);
  }

  onActivateSuccess(msg) {
    toastr.success(msg);
  }

  onActivateFail(msg) {
    toastr.error(msg);
  }
}

export default alt.createStore(ActivateCodeStore);
