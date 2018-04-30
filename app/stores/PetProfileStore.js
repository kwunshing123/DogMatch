import {assign} from 'underscore';
import alt from '../alt';
import PetProfileActions from '../actions/PetProfileActions';
import NavbarActions from '../actions/NavbarActions';

class PetProfileStore {
  constructor() {
    this.bindActions(PetProfileActions);
    this.petId = 0;
    this.petOwnerId = 0;
    this.name = 'Undefined';
    this.owner = 'Undefined';
    this.gender = 'Undefined';
    this.birthday = 'Undefined';
    this.iconImage = '/img/default.png';
    this.type = 'Undefined';
    this.introduction = 'Undefined';
    this.partiesJoined = 0;
    this.followers = 0;
    this.dating = 0;
    this.isFollowed = false;
    this.owned = false;
    this.havePet = false;
  }

  onGetPetSuccess(data) {
    assign(this, data.petInfo);
    this.setState({owned: data.owned, isFollowed: data.isFollowed, havePet: data.havePet});
    PetProfileActions.getOwner(data.petInfo.petOwnerId);
  }

  onGetPetFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onGetOwnerSuccess(data) {
    this.owner = data.ownerInfo.name;
  }

  onGetOwnerFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onFollowsPetSuccess(data) {
    toastr.success(data.message);
    NavbarActions.getUnreadNotification();
    PetProfileActions.getPet(data.followedPetId);
  }

  onFollowsPetFail(jqXhr) {
    toastr.warning(jqXhr);
  }

  onUnfollowsPetSuccess(data) {
    toastr.success(data.message);
    NavbarActions.getUnreadNotification();
    PetProfileActions.getPet(data.unFollowedPetId);
  }

  onUnfollowsPetFail(jqXhr) {
    toastr.error(jqXhr);
  }

  onGetAttendedPartiesSuccess(data) {
    this.setState({ partiesJoined: data.total });
  }

  onGetAttendedPartiesFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

}

export default alt.createStore(PetProfileStore);
