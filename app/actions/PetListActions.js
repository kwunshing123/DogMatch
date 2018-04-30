import alt from '../alt';

class PetListActions {
  constructor() {
    this.generateActions(
      'getPetsSuccess',
      'getPetsFail',
      'getStarsSuccess',
      'getStarsFail'
    );
  }

  getPets(offset, qty) {
    $.ajax({ url: '/api/pets/'+ offset + '/' + qty })
    .done((data) => {
      this.actions.getPetsSuccess({data, offset});
    })
    .fail((jqXhr) => {
      this.actions.getPetsFail(jqXhr);
    });
  }

  getStars(offset, qty) {
    $.ajax({ url: '/api/pets/stars/'+ offset + '/' + qty })
    .done((data) => {
      this.actions.getStarsSuccess({data, offset});
    })
    .fail((jqXhr) => {
      this.actions.getStarsFail(jqXhr);
    });
  }

}

export default alt.createActions(PetListActions);
