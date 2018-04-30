import alt from '../alt';

class PetProfileActions {
  constructor() {
    this.generateActions(
      'getPetSuccess',
      'getPetFail',
      'getOwnerSuccess',
      'getOwnerFail',
      'followsPetSuccess',
      'followsPetFail',
      'unfollowsPetSuccess',
      'unfollowsPetFail',
      'getAttendedPartiesSuccess',
      'getAttendedPartiesFail'
    );
  }

  getPet(petId) {
    $.ajax({ url: '/api/pet/' + petId })
    .done((data) => {
      this.actions.getPetSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getPetFail(jqXhr);
    });
  }

  getOwner(petOwnerId) {
    $.ajax({ url: '/api/owner/' + petOwnerId })
    .done((data) => {
      this.actions.getOwnerSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getOwnerFail(jqXhr);
    });
  }

  followsPet(petId) {
    $.ajax({
      type: 'POST',
      url: '/api/pet/follows',
      data: { petId: petId }
    })
    .done((data) => {
      this.actions.followsPetSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.followsPetFail(jqXhr.responseJSON.message);
    });
  }

  unfollowsPet(petId) {
    $.ajax({
      type: 'POST',
      url: '/api/pet/unfollows',
      data: { petId: petId }
    })
    .done((data) => {
      this.actions.unfollowsPetSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.unfollowsPetFail(jqXhr.responseJSON.message);
    });
  }

  getAttendedParties(petId, offset, qty) {
    $.ajax({ url: '/api/pet/' + petId + '/attended/' + offset + '/' + qty })
    .done((data) => {
      this.actions.getAttendedPartiesSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getAttendedPartiesFail(jqXhr);
    });
  }

}

export default alt.createActions(PetProfileActions);
