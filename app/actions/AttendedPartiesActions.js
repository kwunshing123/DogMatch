import alt from '../alt';

class AttendedPartiesActions {
  constructor() {
    this.generateActions(
      'getAttendedPartiesSuccess',
      'getAttendedPartiesFail'
    );
  }

  getAttendedParties(petId, offset, qty) {
    $.ajax({ url: '/api/pet/' + petId + '/attended/' + offset + '/' + qty })
    .done((data) => {
      this.actions.getAttendedPartiesSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getAttendedPartiesFail(jqXhr);
    });
  }

}

export default alt.createActions(AttendedPartiesActions);
