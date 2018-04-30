import alt from '../alt';

class ActivateCodeActions {
  constructor() {
    this.generateActions(
      'activateSuccess',
      'activateFail'
    );
  }

  activate(activateCode) {
    $.ajax({
      type: 'POST',
      url: '/api/activate/account',
      data: {activateCode: activateCode}
    })
      .done((data) => {
        this.actions.activateSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.activateFail(jqXhr.responseJSON.message);
      });
  }

}

export default alt.createActions(ActivateCodeActions);
