import alt from '../alt';
import DatingDetailsActions from '../actions/DatingDetailsActions';

class DatingDetailsStore {
  constructor() {
    this.bindActions(DatingDetailsActions);
    this.datingId = null;
    this.targetPetId = null;
    this.targetPetOwnerId = null;
    this.address = 'undefined';
    this.date = 'undefined';
    this.start = 'undefined';
    this.end = 'undefined';
    this.message = 'undefined';
    this.petOwnerId = null;
    this.petOwnerName = 'undefined';
    this.petId = null;
    this.status = null;
    this.isInviter = false;
    this.inviter = 'undefined';
    this.invitee = 'undefined';
    this.inviterPet = 'undefined';
    this.inviteePet = 'undefined';
  }

  onGetDatingDetailsSuccess(data) {
    this.setState(data);
    DatingDetailsActions.getInviter(data.petOwnerId);
    DatingDetailsActions.getInvitee(data.targetPetOwnerId);
    DatingDetailsActions.getInviterPet(data.petId);
    DatingDetailsActions.getInviteePet(data.targetPetId);
  }

  onGetDatingDetailsFail(msg) {
    toastr.error(msg);
  }

  onGetInviterSuccess(data) {
    this.setState({inviter: data.ownerInfo});
  }

  onGetInviterFail(msg) {
    toastr.error(msg);
  }

  onGetInviteeSuccess(data) {
    this.setState({invitee: data.ownerInfo});
  }

  onGetInviteeFail(msg) {
    toastr.error(msg);
  }

  onGetInviterPetSuccess(data) {
    this.setState({inviterPet: data.petInfo});
  }

  onGetInviterPetFail(msg) {
    toastr.error(msg);
  }

  onGetInviteePetSuccess(data) {
    this.setState({inviteePet: data.petInfo});
  }

  onGetInviteePetFail(msg) {
    toastr.error(msg);
  }

  onAcceptSuccess(data) {
    DatingDetailsActions.getDatingDetails(data.datingId);
    toastr.success(data.message);
  }

  onAcceptFail(msg) {
    toastr.error(msg);
  }

  onRejectSuccess(data) {
    DatingDetailsActions.getDatingDetails(data.datingId);
    toastr.success(data.message);
  }

  onRejectFail(msg) {
    toastr.error(msg);
  }

}

export default alt.createStore(DatingDetailsStore);
