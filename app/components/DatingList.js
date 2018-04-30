import React from 'react';
import ReactPaginate from 'react-paginate';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import DatingListStore from '../stores/DatingListStore';
import DatingListActions from '../actions/DatingListActions';

class DatingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = DatingListStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    DatingListStore.listen(this.onChange);
    DatingListActions.getDating(0, 10);
  }

  componentWillUnmount() {
    DatingListStore.unlisten(this.onChange);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.params, this.props.params)) DatingListActions.getDating(0, 10);
  }

  onChange(state) {
    this.setState(state);
  }

  handlePageClick(data) {
    let selected = data.selected;
    this.setState(() => {
      DatingListActions.getDating(selected, 10);
    });
  };

  render() {
    var datingList;
    if(this.state.datings.length) {
      datingList = this.state.datings.map((dating, index) => {
        var statement, color;
        switch (dating.status) {
          case 1:
            color = '';
            statement = "Waiting for reply";
            break;
          case 2:
            color = "green";
            statement = "Accepted";
            break;
          case 3:
            color = "red";
            statement = "Rejected";
            break;
        }
      return (
        <div className='list-group-item animated fadeIn' key={dating.datingId}>
          <Link to={'/dating/' + dating.datingId} >
            <div className='media'>
              <div className='pull-right'>
                <div className={'position ' + color} style={{fontSize: '20px'}}>
                  {statement}
                </div>
              </div>
              <div className='media-body'>
                Inviter： <h4 className='media-heading'>{dating.petOwnerName}</h4>
                <small> Inviter Dog: <strong>{dating.petName}</strong> <br/>
                        Invitee Dog: <strong>{dating.name}</strong> <br/>
                        Address: <strong>{dating.address}</strong> <br/>
                        Date: <strong>{dating.date}</strong> <br/>
                        Start: <strong>{dating.start}</strong><br/>
                        End: <strong>{dating.end}</strong>
                </small>
              </div>
            </div>
          </Link>
        </div>
        );
      });
    } else {
      datingList = <div className='alert alert-warning' role='alert'>
                            <strong>Try to date a pet.</strong>
                          </div>;
    }

    return (
      <div className='container'>
        <div className="page-header">
          <h3><strong>Dating</strong></h3>
        </div>
        <div className='list-group'>
          {datingList}
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

export default DatingList;
