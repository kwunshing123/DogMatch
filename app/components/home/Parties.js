import React from 'react';
import PartyListActions from '../../actions/PartyListActions';
import PartyListStore from '../../stores/PartyListStore';

class Parties extends React.Component {
  constructor(props) {
    super(props);
    this.state = PartyListStore.getState();
    this.onChange = this.onChange.bind(this);
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

  handleClick(e) {
    window.location.href = "/party/" + e.currentTarget.id;
  }

  render() {
    if(this.state.parties.length) {
      var partyList = this.state.parties.map((party, index) => {
        return (
            <tr style={{cursor:"pointer"}} key={party.partyId} id={party.partyId} onClick={this.handleClick.bind(this)}>
              <td>{party.name}</td>
              <td>{party.date}</td>
              <td>{party.address}</td>
              <td>{party.fee}</td>
            </tr>
        );
      });
    } else {
      partyList = null;
    }

    return (
      <div className='row'>
        <div className="page-header">
          <h3><strong>10 Latest Parties</strong></h3>
        </div>
        <div className='container'>
          <div className='panel panel-default'>
            <table className='table table-responsive table-hover'>
              <thead>
                <tr>
                  <th className='col-xs-3'>Party</th>
                  <th className='col-xs-4'>Date</th>
                  <th className='col-xs-3'>Address</th>
                  <th className='col-xs-2'>Fee</th>
                </tr>
              </thead>
              <tbody>
                {partyList}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Parties;
