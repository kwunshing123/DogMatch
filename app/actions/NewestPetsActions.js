import alt from '../alt';

class NewestPetsActions {
  constructor() {
    this.generateActions(
      'getNewestPetsSuccess',
      'getNewestPetsFail'
    );
  }

  getNewestPets() {
    $.ajax({ url: '/api/pets/new/'})
    .done((data) => {
      this.actions.getNewestPetsSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getNewestPetsFail(jqXhr);
    });
  }

}

export default alt.createActions(NewestPetsActions);
