import {assign} from 'underscore';
import alt from '../alt';
import OwnerProfileActions from '../actions/OwnerProfileActions';
import NavbarActions from '../actions/NavbarActions';

class OwnerProfileStore {
  constructor() {
    this.bindActions(OwnerProfileActions);
    this.petOwnerId = 0;
    this.name = 'Undefined';
    this.gender = 'Undefined';
    this.birthday = 'Undefined';
    this.iconImage = '/img/default.png';
    this.memberSince = 'Undefined';
    this.country = 'Undefined';
    this.owned = false;
  }

  onGetOwnerSuccess(data) {
    assign(this, data.ownerInfo);
    this.setState({owned: data.owned});
  }

  onGetOwnerFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

}

export default alt.createStore(OwnerProfileStore);
