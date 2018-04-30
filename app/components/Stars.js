import React from 'react';
import {Link} from 'react-router';
import ReactPaginate from 'react-paginate';
import PetListActions from '../actions/PetListActions';
import PetListStore from '../stores/PetListStore';

class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = PetListStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    PetListStore.listen(this.onChange);
    PetListActions.getStars(0, 10);
  }

  componentWillUnmount() {
    PetListStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handlePageClick(data) {
    let selected = data.selected;
    PetListActions.getStars(selected, 10);
  };

  render() {
    var starList = null;
    if(this.state.stars.length) {
      starList = this.state.stars.map((pet, index) => {
      return (
        <div className='list-group-item animated fadeIn' key={pet.petId}>
          <Link to={'/pet/' + pet.petId} >
            <div className='media'>
              <span className='position pull-left'>{(index + 1) + this.state.page * 10}</span>
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
    }

    return (
      <div className='container'>
        <h2>Top 30 Most Follower Dogs</h2>
        <div className='list-group'>
          {starList}
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

export default Stars;
