import React from 'react';
import {Link} from 'react-router';
import PartyDetailsActions from '../../actions/PartyDetailsActions';
import PartyDetailsStore from '../../stores/PartyDetailsStore';

class PartyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = PartyDetailsStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PartyDetailsStore.listen(this.onChange);
    PartyDetailsActions.getPartyDetails(this.props.partyId);
  }

  componentWillUnmount() {
    PartyDetailsStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    PartyDetailsActions.attendParty(this.state.partyId);
  }

  render() {

    return (
      <div className='well'>
        <div className='clearfix'>
          <div className='row col-sm-offset-1'>
            <div className='col-sm-6'>
              <h2><strong>{this.state.name}</strong></h2><p/>
              <div className='lead' style={{fontSize: '18px'}}>
                Organizer: <Link to={'/owner/' + this.state.petOwnerId} ><strong>{this.state.organizer}</strong></Link><p/>
                Date: <strong>{this.state.date}</strong><p/>
                Start time: <strong>{this.state.start}</strong><p/>
                End time: <strong>{this.state.end}</strong><p/>
                Address: <strong>{this.state.address}</strong>
              </div>
              <div className='row'>
                <div className='col-sm-6'>
                  <h4> Attendation fee:
                    <div className='position green' style={{marginLeft: 0, fontSize: '28px', lineHeight: '56px'}}>
                      {this.state.fee}
                    </div>
                  </h4>
                </div>
              </div>
              {(this.state.status == 0) ? (
                <div className='position row' style={{color: "red", marginLeft: 0, fontSize: '28px', lineHeight: '56px'}}>
                  Closed
                </div>
              ) : (<span> </span>)}
              {(this.state.attended) ? (
                <div className='position row' style={{color: "red", marginLeft: 0, fontSize: '28px', lineHeight: '56px'}}>
                    Attended
                </div>
              ) : (<span> </span>)}
              {(this.state.logined && this.state.status != 0 && !this.state.attended) ? (
                <div>
                  <div className='row' style={{marginLeft: 0}}>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                      <button type='submit' className='btn btn-success col-sm-4'>Attends</button>
                    </form>
                  </div>
                  <strong>*Reminder: If you click 'Attends', means you accepted and understanded all the clauses.</strong>
                </div>
              ) : (<span> </span>)}
            </div>
            <div className='col-sm-6'>
              <div className='lead' style={{fontSize: '18px'}}>Condition: <br/>
                1. Number of participants: <br/>
                <strong>{this.state.condition.numberOfParticipants}</strong><br/>
                2. Dog Age: <br/>
                <strong>{this.state.condition.age}</strong><br/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PartyDetails;
