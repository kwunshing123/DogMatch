import alt from '../alt';
import PetListActions from '../actions/PetListActions';

class PetListStore {
  constructor() {
    this.bindActions(PetListActions);
    this.pets = [];
    this.stars = [];
    this.offset = 0;
    this.pageCount = 0;
    this.page = 0;
  }

  onGetPetsSuccess(result) {
    this.setState({pets: result.data.results,
                  pageCount: Math.ceil(result.data.total / 10),
                  page: result.offset});
  }

  onGetPetsFail(jqXhr) {
    toastr.error(jqXhr);
  }

  onGetStarsSuccess(result) {
    this.setState({stars: result.data.results,
                  pageCount: Math.ceil(result.data.total / 10),
                  page: result.offset});
  }

  onGetStarsFail(jqXhr) {
    toastr.error(jqXhr);
  }
}

export default alt.createStore(PetListStore);
