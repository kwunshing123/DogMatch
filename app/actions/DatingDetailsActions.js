import alt from '../alt';

class DatingDetailsActions {
  constructor() {
    this.generateActions(
      'getDatingDetailsSuccess',
      'getDatingDetailsFail',
      'getInviterSuccess',
      'getInviterFail',
      'getInviteeSuccess',
      'getInviteeFail',
      'getInviterPetSuccess',
      'getInviterPetFail',
      'getInviteePetSuccess',
      'getInviteePetFail',
      'acceptSuccess',
      'acceptFail',
      'rejectSuccess',
      'rejectFail'
    );
  }

  getDatingDetails(datingId) {
    $.ajax({ url: '/api/dating/'+ datingId + '/' })
    .done((data) => {
      this.actions.getDatingDetailsSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getDatingDetailsFail(jqXhr);
    });
  }

  getInviter(petOwnerId) {
    $.ajax({ url: '/api/owner/'+ petOwnerId })
    .done((data) => {
      this.actions.getInviterSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getInviterFail(jqXhr);
    });
  }

  getInvitee(petOwnerId) {
    $.ajax({ url: '/api/owner/'+ petOwnerId })
    .done((data) => {
      this.actions.getInviteeSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getInviteeFail(jqXhr);
    });
  }

  getInviterPet(petId) {
    $.ajax({ url: '/api/pet/'+ petId })
    .done((data) => {
      this.actions.getInviterPetSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getInviterPetFail(jqXhr);
    });
  }

  getInviteePet(petId) {
    $.ajax({ url: '/api/pet/'+ petId })
    .done((data) => {
      this.actions.getInviteePetSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getInviteePetFail(jqXhr);
    });
  }

  accept(datingId) {
    $.ajax({
      type: 'POST',
      url: '/api/dating/accept',
      data: {datingId: datingId}
    })
    .done((data) => {
      this.actions.acceptSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.acceptFail(jqXhr.responseJSON.message);
    });
  }

  reject(datingId) {
    $.ajax({
      type: 'POST',
      url: '/api/dating/reject',
      data: {datingId: datingId}
    })
    .done((data) => {
      this.actions.rejectSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.rejectFail(jqXhr.responseJSON.message);
    });
  }

}

export default alt.createActions(DatingDetailsActions);
