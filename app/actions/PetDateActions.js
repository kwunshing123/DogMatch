import alt from '../alt';

class PetDateActions {
  constructor() {
    this.generateActions(
      'updateMessage',
      'updateStart',
      'updateEnd',
      'updateAddress',
      'updateDate',
      'getInfoSuccess',
      'getInfoFail',
      'postInvitationSuccess',
      'postInvitationFail',
      'invalidInfo',
      'invalidDate'
    );
  }

  getInfo(petId) {
    $.ajax({ url: '/api/pet/' + petId })
    .done((data) => {
      this.actions.getInfoSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getInfoFail(jqXhr);
    });
  }

  postInvitation(data) {
    $.ajax({
      type: 'POST',
      url: '/api/pet/date',
      data: data
    })
    .done((data) => {
      this.actions.postInvitationSuccess(data.message);
    })
    .fail((jqXhr) => {
      this.actions.postInvitationFail(jqXhr.responseJSON.message);
    });
  }

}

export default alt.createActions(PetDateActions);
