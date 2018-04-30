import alt from '../alt';

class ForgotPWConfirmCodeActions {
  constructor() {
    this.generateActions(
      'updateNewPassword',
      'updateNewPassword1',
      'invalidPassword',
      'modifyPasswordSuccess',
      'modifyPasswordFail',
      'invalidPasswordLengthOrCharacter'
    );
  }

  modifyPassword(newPassword, confirmCode) {
    $.ajax({
      type: 'POST',
      url: '/api/' + confirmCode + '/modifyPassword',
      data: { newPassword: newPassword}
    })
      .done((data) => {
        this.actions.modifyPasswordSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.modifyPasswordFail(jqXhr.responseJSON.message);
      });
  }

}

export default alt.createActions(ForgotPWConfirmCodeActions);
