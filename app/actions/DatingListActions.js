import alt from '../alt';

class DatingListActions {
  constructor() {
    this.generateActions(
      'getDatingSuccess',
      'getDatingFail'
    );
  }

  getDating(offset, qty) {
    $.ajax({ url: '/api/pets/dating/' + offset + '/' + qty })
    .done((data) => {
      this.actions.getDatingSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getDatingFail(jqXhr);
    });
  }
}

export default alt.createActions(DatingListActions);
