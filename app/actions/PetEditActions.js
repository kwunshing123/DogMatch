import alt from '../alt';

class PetEditActions {
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
      'invalidInfo',
      'updateImageSuccess',
      'updateImageFail'
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

  updateInfo(data) {
    $.ajax({
      type: 'POST',
      url: '/api/pet/' + data.petId + '/update',
      data: data
    })
    .done((data) => {
      this.actions.updateInfoSuccess(data.message);
    })
    .fail((jqXhr) => {
      this.actions.updateInfoFail(jqXhr.responseJSON.message);
    });
  }

  updateImage(data) {
    $.ajax({
      type: 'POST',
      url: '/api/pet/update/iconimage',
      data: {petId: data.petId, image: data.image}
    })
    .done((data) => {
      this.actions.updateImageSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.updateImageFail(jqXhr.responseJSON.message);
    });
  }

}

export default alt.createActions(PetEditActions);
