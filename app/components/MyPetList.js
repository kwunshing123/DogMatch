import React from 'react';
import {Link} from 'react-router';
import ReactPaginate from 'react-paginate';
import MyPetListActions from '../actions/MyPetListActions';
import MyPetListStore from '../stores/MyPetListStore';

class MyPetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = MyPetListStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    MyPetListStore.listen(this.onChange);
    MyPetListActions.getMyPets(0, 10);
  }

  componentWillUnmount() {
    MyPetListStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handlePageClick(data) {
  let selected = data.selected;
    this.setState(() => {
      MyPetListActions.getMyPets(selected, 10);
    });
  };

  render() {
    var myPetList = null;
    if(this.state.pets.length) {
      myPetList = this.state.pets.map((pet, index) => {
      return (
        <div className='list-group-item animated fadeIn' key={pet.petId}>
            <div className='media row'>
              <div className='pull-right col-md-1' style={{marginTop: '3rem'}}>
                <Link to={'/pet/' + pet.petId + '/edit'} className='btn btn-success' style={{marginRight: '1em'}}>
                  <span className='glyphicon glyphicon-pencil'></span> Edit
                </Link>
              </div>
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
    }

    return (
      <div className='container'>
        <div className='row' style={{margin: '10px 0 10px 0'}}>
          <h2 className='col-xs-7 col-md-10' style={{margin: '0 0 0 0'}}>My Dog(s)</h2>
          <span className='col-xs-5 col-md-1'>
            <Link to={'/pet/new'} className='btn btn-info' style={{marginRight: '1em'}}>
              <span className='glyphicon glyphicon-plus'></span> Add a dog
            </Link>
          </span>
        </div>
        <div className='list-group'>
          {myPetList}
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

export default MyPetList;
