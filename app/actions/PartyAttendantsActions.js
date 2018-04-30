import alt from '../alt';

class PartyAttendantsActions {
  constructor() {
    this.generateActions(
      'getAttendantsSuccess',
      'getAttendantsFail'
    );
  }

  getAttedants(partyId, offset, qty) {
    $.ajax({ url: '/api/party/' + partyId + '/attendants/' + offset + '/' + qty })
    .done((data) => {
      this.actions.getAttendantsSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getAttendantsFail(jqXhr);
    });
  }

}

export default alt.createActions(PartyAttendantsActions);
