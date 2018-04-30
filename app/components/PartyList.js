import React from 'react';
import {Link} from 'react-router';
import ReactPaginate from 'react-paginate';
import PartyListActions from '../actions/PartyListActions';
import PartyListStore from '../stores/PartyListStore';

class PartyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = PartyListStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    PartyListStore.listen(this.onChange);
    PartyListActions.getParties(0, 10);
  }

  componentWillUnmount() {
    PartyListStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handlePageClick(data) {
    let selected = data.selected;
    this.setState(() => {PartyListActions.getParties(selected, 10);});
  };

  render() {
    if(this.state.parties.length) {
      var partyList = this.state.parties.map((party, index) => {
        return (
        <div key={party.partyId}>
          <div className='list-group-item animated fadeIn'>
            <Link to={'/party/' + party.partyId}>
              <div className='media'>
                {(party.status == 1) ? (
                  <div className='pull-right'>
                    Number of Attendants:
                    <div className='position green'>
                      {party.attendant.length} / {party.condition.numberOfParticipants}
                    </div>
                  </div>
                ) : (
                   (party.status == 0) ? (
                    <div className='pull-right'>
                      Number of Attendants:
                      <div className='position red'>
                        {party.attendant.length} / {party.condition.numberOfParticipants}
                      </div>
                    </div>
                  ) : (
                    <div className='pull-right'>
                      <div className='position red'>
                        Closed
                      </div>
                    </div>
                  )
                )}
                <div className='media-body'>
                  <h2 className='media-heading'>{party.name}</h2><p/>
                  Date: {party.date}<p/>
                  Start Time: {party.start}<p/>
                  End Time: {party.end}<p/>
                  Organizer：{party.organizer}<p/>
                  Attending Fees: <strong>{party.fee}</strong>
                </div>
              </div>
            </Link>
          </div>
        </div>
        );
      });
    } else {
      partyList = <div className='alert alert-warning' role='alert'>
                    <strong>Aware!</strong> There is no any party yet.
                  </div>;
    }

    return (
      <div className='container'>
        <div className='list-group'>
          {partyList}
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

export default PartyList;
