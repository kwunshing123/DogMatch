import alt from '../alt';
import MyPetListActions from '../actions/MyPetListActions';

class MyPetListStore {
  constructor() {
    this.bindActions(MyPetListActions);
    this.pets = [];
    this.stars = [];
    this.offset = 0;
    this.pageCount = 0;
  }

  onGetMyPetsSuccess(data) {
    this.setState({pets: data.results, pageCount: Math.ceil(data.total / 10)});
  }

  onGetMyPetsFail(jqXhr) {
    toastr.error(jqXhr);
  }
}

export default alt.createStore(MyPetListStore);
