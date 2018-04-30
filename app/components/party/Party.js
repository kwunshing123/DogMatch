import React from 'react';
import PartyDetails from './PartyDetails';
import PartyRemarks from './PartyRemarks';
import PartyAttendants from './PartyAttendants';

class Party extends React.Component {
  render() {
    return (
      <div className='container'>
        <PartyDetails partyId={this.props.params.partyId}/>
        <h4 className='lead'><strong>Attendants</strong></h4>
        <PartyAttendants partyId={this.props.params.partyId}/>
        <h4 className='lead'><strong>Remarks</strong></h4>
        <PartyRemarks partyId={this.props.params.partyId}/>
      </div>
    );
  }
}

export default Party;
