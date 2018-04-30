import React from 'react';
import ReactPaginate from 'react-paginate';
import {Link} from 'react-router';
import OwnerPetListStore from '../../stores/OwnerPetListStore';
import OwnerPetListActions from '../../actions/OwnerPetListActions';

class PetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = OwnerPetListStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    OwnerPetListStore.listen(this.onChange);
    OwnerPetListActions.getOwnerPets(this.props.id, 0, 5);
  }

  componentWillUnmount() {
    OwnerPetListStore.unlisten(this.onChange);
    $(document.body).removeClass();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) OwnerPetListActions.getOwnerPets(this.props.id, 0, 5);
  }

  onChange(state) {
    this.setState(state);
  }

  handlePageClick(data) {
    let selected = data.selected;
    this.setState(() => {
      OwnerPetListActions.getOwnerPets(this.props.id, selected, 5);
    });
  };

  render() {
    if(this.state.pets.length) {
      var pets = this.state.pets.map((pet, index) => {
        return (
          <div className='list-group-item animated fadeIn' key={pet.petId}>
              <div className='media row'>
                <Link to={'/pet/' + pet.petId} >
                  <div className='col-md-11'>
                    <div className='pull-left thumb-lg'>
                        <img className='media-object' src={pet.iconImage} style={{minHeight: '86px'}}/>
                    </div>
                    <h4 className='media-heading'>{pet.name}</h4>
                    <small>Type: <strong>{pet.type}</strong> <br/>
                            Gender: <strong>{pet.gender}</strong> <br/>
                            Age: <strong>{pet.age}</strong>
                    </small>
                  </div>
                </Link>
              </div>
          </div>
        );
      });
    } else {
      pets = <div className='alert alert-warning' role='alert'>
                  <strong>There is no any pets yet.</strong>
                </div>;
    }

    return (
      <div>
        <div className='well'>
          {pets}
        </div>
        <ReactPaginate previousLabel={"previous"}
                 nextLabel={"next"}
                 breakLabel={<a href="">...</a>}
                 breakClassName={"break-me"}
                 pageCount={this.state.pageCount}
                 marginPagesDisplayed={2}
                 pageRangeDisplayed={5}
                 onPageChange={this.handlePageClick}
                 containerClassName={"pagination"}
                 subContainerClassName={"pages pagination"}
                 activeClassName={"active"} />
        </div>
    );
  }
}

export default PetList;
