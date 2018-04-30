import alt from '../alt';

class MyPetListActions {
  constructor() {
    this.generateActions(
      'getMyPetsSuccess',
      'getMyPetsFail'
    );
  }

  getMyPets(offset, qty) {
    $.ajax({ url: '/api/owner/mypets/'+ offset + '/' + qty })
    .done((data) => {
      this.actions.getMyPetsSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getMyPetsFail(jqXhr);
    });
  }

}

export default alt.createActions(MyPetListActions);
