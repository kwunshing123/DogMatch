import alt from '../alt';

class LoginActions {
  constructor() {
    this.generateActions(
      'loginSuccess',
      'loginFail',
      'updateEmail',
      'updatePassword'
    );
  }

  Login(email, password) {
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: { email: email, password: password }
    })
      .done((data) => {
        this.actions.loginSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.loginFail(jqXhr.responseJSON.message);
      });
  }

  redirectToHome() {
    window.location.href = "/";
  }
}

export default alt.createActions(LoginActions);
