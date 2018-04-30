import alt from '../alt';

class PetCommentsActions {
  constructor() {
    this.generateActions(
      'getPetCommentsSuccess',
      'getPetCommentsFail'
    );
  }

  getPetComments(petId, offset, qty) {
    $.ajax({ url: '/api/pet/' + petId + '/comments/' + offset + '/' + qty})
      .done((data) => {
        this.actions.getPetCommentsSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getPetCommentsFail(jqXhr);
      });
  }

}

export default alt.createActions(PetCommentsActions);
