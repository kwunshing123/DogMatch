import alt from '../alt';
import SupportActions from '../actions/SupportActions';

class SupportStore {
  constructor() {
    this.bindActions(SupportActions);
    this.subject = '';
    this.type = 'account';
    this.content = '';
  }

  onPostSuccess(successMessage) {
    this.setState({subject: '', type: '', content: ''});
    toastr.success(successMessage);
  }

  onPostFail(errorMessage) {
    toastr.error(errorMessage);
  }

  onUpdateSubject(event) {
    this.setState({subject: event.target.value});
  }

  onUpdateType(event) {
    this.setState({type: event.target.value});
  }

  onUpdateContent(event) {
    this.setState({content: event.target.value});
  }

  onInvalidInfo() {
    toastr.error("Please enter all the information");
  }

}

export default alt.createStore(SupportStore);
