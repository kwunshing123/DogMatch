import alt from '../alt';

class SignUpActions {
  constructor() {
    this.generateActions(
      'signUpSuccess',
      'signUpFail',
      'updateEmail',
      'updatePassword',
      'updatePassword1',
      'updateAgree',
      'invalidEmail',
      'invalidPassword',
      'invalidPasswordLengthOrCharacter'
    );
  }

  signUp(email, password) {
    $.ajax({
      type: 'POST',
      url: '/api/signup',
      data: { email: email, password: password }
    })
      .done((data) => {
        this.actions.signUpSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.signUpFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(SignUpActions);
