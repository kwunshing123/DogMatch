import React from 'react';
import ReactPaginate from 'react-paginate';
import {Link} from 'react-router';
import AttendedPartiesStore from '../../stores/AttendedPartiesStore';
import AttendedPartiesActions from '../../actions/AttendedPartiesActions';

class AttendedParties extends React.Component {
  constructor(props) {
    super(props);
    this.state = AttendedPartiesStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    AttendedPartiesStore.listen(this.onChange);
    this.setState({ petId: this.props.id });
    AttendedPartiesActions.getAttendedParties(this.props.id, 0, 4);
  }

  componentWillUnmount() {
    AttendedPartiesStore.unlisten(this.onChange);
    $(document.body).removeClass();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) AttendedPartiesActions.getAttendedParties(this.props.id, 0, 4);
  }

  onChange(state) {
    this.setState(state);
  }

  handlePageClick(data) {
    let selected = data.selected;
    this.setState(() => {
      AttendedPartiesActions.getAttendedParties(this.props.id, selected, 4);
    });
  };

  render() {
    let attendedParties, partyInfo;
    if(this.state.isAuthorized) {
      if(this.state.parties.length) {
        attendedParties = this.state.parties.map((party, index) => {
          return (
            <div className='well col-sm-3' key={party.partyId}>
              <Link to={'/party/' + party.partyId}>
                <div className='media'>
                  <div className='media-body'>
                    Party: <strong>{party.name}</strong> <p/>
                    Address: {party.address} <p/>
                    Start: {party.start} <p/>
                    End: {party.end}  <p/>
                  </div>
                </div>
              </Link>
            </div>
          );
        });
      } else {
        attendedParties = <div className='alert alert-warning' role='alert'>
                            <strong>The pet have not attended any parties yet.</strong>
                          </div>;
      }
    } else {
      attendedParties = <div className='alert alert-warning' role='alert'>
                          You needed to login first for seeing this pet joined party.
                        </div>
    }

    return (
      <div>
        <div className='row' style={{margin: '0px 0px 0px 0px'}}>
          {attendedParties}
        </div>
          <ReactPaginate previousLabel={"previous"}
                   nextLabel={"next"}
                   breakLabel={<a href="">...</a>}
                   breakClassName={"break-me"}
                   pageCount={this.state.partiesPageCount}
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

export default AttendedParties;
