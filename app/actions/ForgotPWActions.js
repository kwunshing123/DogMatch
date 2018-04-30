import alt from '../alt';

class ForgotPWActions {
  constructor() {
    this.generateActions(
      'SubmitSuccess',
      'SubmitFail',
      'updateEmail'
    );
  }

  fotgotPassword(email) {
    $.ajax({
      type: 'POST',
      url: '/api/forgotpassword',
      data: {email: email}
    })
      .done((data) => {
        this.actions.SubmitSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.SubmitFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(ForgotPWActions);
