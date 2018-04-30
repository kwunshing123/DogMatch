import alt from '../alt';

class OwnerPetListActions {
  constructor() {
    this.generateActions(
      'getOwnerPetsSuccess',
      'getOwnerPetsFail'
    );
  }

  getOwnerPets(petOwnerId, offset, qty) {
    $.ajax({ url: '/api/owner/' + petOwnerId + '/pets/'+ offset + '/' + qty })
    .done((data) => {
      this.actions.getOwnerPetsSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getOwnerPetsFail(jqXhr);
    });
  }

}

export default alt.createActions(OwnerPetListActions);
