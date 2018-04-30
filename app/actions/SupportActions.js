import alt from '../alt';

class SupportActions {
  constructor() {
    this.generateActions(
      'postSuccess',
      'postFail',
      'updateSubject',
      'updateContent',
      'updateType',
      'invalidInfo'
    );
  }

  post(subject, type, content) {
    $.ajax({
      type: 'POST',
      url: '/api/support/post',
      data: { subject: subject, type: type, content: content }
    })
      .done((data) => {
        this.actions.postSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.postFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(SupportActions);
