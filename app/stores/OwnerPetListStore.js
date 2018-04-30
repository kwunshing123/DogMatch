import alt from '../alt';
import OwnerPetListActions from '../actions/OwnerPetListActions';

class OwnerPetListStore {
  constructor() {
    this.bindActions(OwnerPetListActions);
    this.pets = [];
    this.stars = [];
    this.offset = 0;
    this.pageCount = 0;
  }

  onGetOwnerPetsSuccess(data) {
    this.setState({pets: data.results, pageCount: Math.ceil(data.total / 10)});
  }

  onGetOwnerPetsFail(jqXhr) {
    toastr.error(jqXhr);
  }
}

export default alt.createStore(OwnerPetListStore);
