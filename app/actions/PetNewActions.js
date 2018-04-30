import alt from '../alt';

class PetNewActions {
  constructor() {
    this.generateActions(
      'updateName',
      'updateGender',
      'updateType',
      'updateIntroduction',
      'updateBirthday',
      'updateIconImage',
      'getInfoSuccess',
      'getInfoFail',
      'updateInfoSuccess',
      'updateInfoFail',
      'invalidInfo'
    );
  }

  updateInfo(data) {
    $.ajax({
      type: 'POST',
      url: '/api/pet/new',
      data: data
    })
    .done((data) => {
      this.actions.updateInfoSuccess(data.message);
    })
    .fail((jqXhr) => {
      this.actions.updateInfoFail(jqXhr.responseJSON.message);
    });
  }

}

export default alt.createActions(PetNewActions);
