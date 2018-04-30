import alt from '../alt';

class PartyListActions {
  constructor() {
    this.generateActions(
      'getPartiesSuccess',
      'getPartiesFail'
    );
  }

  getParties(offset, qty) {
    $.ajax({ url: '/api/parties/'+ offset + '/' + qty })
    .done((data) => {
      this.actions.getPartiesSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getPartiesFail(jqXhr);
    });
  }

}

export default alt.createActions(PartyListActions);
