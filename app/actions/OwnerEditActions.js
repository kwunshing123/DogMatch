import alt from '../alt';

class OwnerEditActions {
  constructor() {
    this.generateActions(
      'updateUserName',
      'updateGender',
      'updateBirthday',
      'getInfoSuccess',
      'getInfoFail',
      'selectCountry',
      'updateInfoSuccess',
      'updateInfoFail',
      'invalidInfo',
      'updateImageSuccess',
      'updateImageFail'
    );
  }

  getInfo(petOwnerId) {
    $.ajax({ url: '/api/owner/' + petOwnerId })
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
      url: '/api/owner/update',
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
      url: '/api/owner/update/iconimage',
      data: {image: data}
    })
      .done((data) => {
        this.actions.updateImageSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.updateImageFail(jqXhr.responseJSON.message);
      });
  }

}

export default alt.createActions(OwnerEditActions);
