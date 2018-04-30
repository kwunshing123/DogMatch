import alt from '../alt';

class ModifyPasswordActions {
  constructor() {
    this.generateActions(
      'updateOldPassword',
      'updateNewPassword',
      'updateNewPassword1',
      'invalidPassword',
      'invalidPasswordLengthOrCharacter',
      'modifyPasswordSuccess',
      'modifyPasswordFail'
    );
  }

  modifyPassword(newPassword, oldPassword) {
    $.ajax({
      type: 'POST',
      url: '/api/owner/modifypassword',
      data: { newPassword: newPassword, oldPassword: oldPassword}
    })
    .done((data) => {
      this.actions.modifyPasswordSuccess(data.message);
    })
    .fail((jqXhr) => {
      this.actions.modifyPasswordFail(jqXhr.responseJSON.message);
    });
  }

}

export default alt.createActions(ModifyPasswordActions);
