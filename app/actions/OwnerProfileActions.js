import alt from '../alt';

class OwnerProfileActions {
  constructor() {
    this.generateActions(
      'getOwnerSuccess',
      'getOwnerFail'
    );
  }

  getOwner(petOwnerId) {
    $.ajax({ url: '/api/owner/' + petOwnerId })
    .done((data) => {
      this.actions.getOwnerSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getOwnerFail(jqXhr);
    });
  }

}

export default alt.createActions(OwnerProfileActions);
