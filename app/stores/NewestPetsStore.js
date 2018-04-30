import {assign} from 'underscore';
import alt from '../alt';
import NewestPetsActions from '../actions/NewestPetsActions';

class NewestPetsStore {
  constructor() {
    this.bindActions(NewestPetsActions);
    this.newPets = [];
  }

  onGetNewestPetsSuccess(data) {
    assign(this.newPets, data);
  }

  onGetNewestPetsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

}

export default alt.createStore(NewestPetsStore);
