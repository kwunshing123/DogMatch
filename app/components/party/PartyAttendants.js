import React from 'react';
import {Link} from 'react-router';
import ReactPaginate from 'react-paginate';
import PartyAttendantsStore from '../../stores/PartyAttendantsStore';
import PartyAttendantsActions from '../../actions/PartyAttendantsActions';

class PartyAttendants extends React.Component {
  constructor(props) {
    super(props);
    this.state = PartyAttendantsStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    PartyAttendantsStore.listen(this.onChange);
    PartyAttendantsActions.getAttedants(this.props.partyId, 0, 3);
  }

  componentWillUnmount() {
    PartyAttendantsStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handlePageClick(data) {
  let selected = data.selected;
    this.setState(() => {
      PartyAttendantsActions.getAttedants(this.props.partyId, selected, 3);
    });
  };

  render() {
    if(this.state.attendants.length) {
      var attendants = this.state.attendants.map((attendant, index) => {
        return (
          <div className='list-group-item animated fadeIn' key={attendant.petId}>
            <Link to={'/pet/' + attendant.petId} >
              <div className='media'>
                <span className='position pull-left'>{index + 1}</span>
                <div className='pull-left thumb-lg'>
                    <img className='media-object' src={attendant.iconImage} />
                </div>
                <div className='media-body'>
                  <h4 className='media-heading'>{attendant.name}</h4>
                  <small>Type: <strong>{attendant.type}</strong> <br/>
                          Gender: <strong>{attendant.gender}</strong> <br/>
                  </small>
                </div>
              </div>
            </Link>
          </div>
        );
      });
    } else {
      attendants = <div className='alert alert-warning' role='alert'>
                      <strong>Aware!</strong> There is no attendant yet. Join this party quickly.
                    </div>;
    }
    return (
      <div className='well'>
      {attendants}
      <ReactPaginate previousLabel={"previous"}
             nextLabel={"next"}
             breakLabel={<a href="">...</a>}
             breakClassName={"break-me"}
             pageCount={this.state.participantsCount}
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

export default PartyAttendants;
