import alt from '../alt';

class NavbarActions {
  constructor() {
    this.generateActions(
      'updateAjaxAnimation',
      'authenticateSuccess',
      'authenticateFail',
      'logoutSuccess',
      'logoutFail',
      'getUnreadNotificationSuccess',
      'getUnreadNotificationFail',
      'getMyPetsSuccess',
      'getMyPetsFail',
      'changesPetSuccess',
      'changesPetFail'
    );
  }

  authenticate() {
    $.ajax({
      type: 'GET',
      url: '/authenticate'
    })
    .done((data) => {
      if (data.success) this.actions.authenticateSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.authenticateFail(jqXhr.message);
    });
  }

  logout() {
    $.ajax({
      type: 'GET',
      url: '/logout'
    })
    .done((data) => {
      this.actions.logoutSuccess(data.message);
    })
    .fail((jqXhr) => {
      this.actions.logoutFail(jqXhr.responseJSON.message);
    });
  }

  getUnreadNotification() {
    $.ajax({
      type: 'GET',
      url: '/api/count/owner/notifications/unread'
    })
    .done((data) => {
      this.actions.getUnreadNotificationSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getUnreadNotificationFail(jqXhr.responseJSON.message);
    });
  }

  getMyPets(offset, qty) {
    $.ajax({ url: '/api/owner/mypets/'+ offset + '/' + qty })
    .done((data) => {
      this.actions.getMyPetsSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getMyPetsFail(jqXhr);
    });
  }

  changesPet(petId) {
    $.ajax({
      type: 'POST',
      url: '/api/changespet',
      data: {petId: petId}
    })
    .done((data) => {
      this.actions.changesPetSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.changesPetFail(jqXhr.responseJSON.message);
    });
  }

}

export default alt.createActions(NavbarActions);
