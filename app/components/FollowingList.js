import React from 'react';
import ReactPaginate from 'react-paginate';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import FollowingListStore from '../stores/FollowingListStore';
import FollowingListActions from '../actions/FollowingListActions';

class FollowingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = FollowingListStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    FollowingListStore.listen(this.onChange);
    FollowingListActions.getFollowing(0, 10);
  }

  componentWillUnmount() {
    FollowingListStore.unlisten(this.onChange);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.params, this.props.params)) FollowingListActions.getFollowing(0, 10);
  }

  onChange(state) {
    this.setState(state);
  }

  handlePageClick(data) {
    let selected = data.selected;
    this.setState(() => {
      FollowingListActions.getFollowing(selected, 10);
    });
  };

  render() {
    var followingPetsList;
    if(this.state.followingPets.length) {
      followingPetsList = this.state.followingPets.map((pet, index) => {
      return (
        <div className='list-group-item animated fadeIn' key={pet.petId}>
          <Link to={'/pet/' + pet.petId} >
            <div className='media'>
              <div className='pull-left thumb-lg'>
                  <img className='media-object' src={pet.iconImage} style={{minHeight: '86px'}}/>
              </div>
              <div className='media-body'>
                <h4 className='media-heading'>{pet.name}</h4>
                <small>Type: <strong>{pet.type}</strong> <br/>
                        Gender: <strong>{pet.gender}</strong> <br/>
                        Age: <strong>{pet.age}</strong>
                </small>
              </div>
            </div>
          </Link>
        </div>
        );
      });
    } else {
      followingPetsList = <div className='alert alert-warning' role='alert'>
                            <strong>Try to follows a pet.</strong>
                          </div>;
    }

    return (
      <div className='container'>
        <div className="page-header">
          <h3><strong>Following Pets</strong></h3>
        </div>
        <div className='list-group'>
          {followingPetsList}
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

export default FollowingList;
