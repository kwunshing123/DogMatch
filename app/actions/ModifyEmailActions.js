import alt from '../alt';

class ModifyEmailActions {
  constructor() {
    this.generateActions(
      'updateNewEmail',
      'updateNewEmail1',
      'modifyEmailSuccess',
      'modifyEmailFail'
    );
  }

  modifyEmail(newEmail) {
    $.ajax({
      type: 'POST',
      url: '/api/owner/modifyemail',
      data: { newEmail: newEmail}
    })
    .done((data) => {
      this.actions.modifyEmailSuccess(data.message);
    })
    .fail((jqXhr) => {
      this.actions.modifyEmailFail(jqXhr.responseJSON.message);
    });
  }

}

export default alt.createActions(ModifyEmailActions);
