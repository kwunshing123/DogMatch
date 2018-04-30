import alt from '../alt';

class PartyDetailsActions {
  constructor() {
    this.generateActions(
      'getPartyDetailsSuccess',
      'getPartyDetailsFail',
      'attendPartySuccess',
      'attendPartyFail'
    );
  }

  getPartyDetails(partyId) {
    $.ajax({ url: '/api/party/'+ partyId + '/' })
    .done((data) => {
      this.actions.getPartyDetailsSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getPartyDetailsFail(jqXhr);
    });
  }

  attendParty(partyId) {
    $.ajax({
      type: 'POST',
      url: '/api/party/attend',
      data: {partyId: partyId}
    })
    .done((data) => {
      this.actions.attendPartySuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.attendPartyFail(jqXhr.responseJSON.message);
    });
  }

}

export default alt.createActions(PartyDetailsActions);
