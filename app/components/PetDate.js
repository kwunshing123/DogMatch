import React from 'react';
import {Link} from 'react-router';
import PetDateStore from '../stores/PetDateStore';
import PetDateActions from '../actions/PetDateActions';

class PetDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = PetDateStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PetDateActions.getInfo(this.props.params.petID);
    PetDateStore.listen(this.onChange);
  }

  componentWillUnmount() {
    PetDateStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    let today = new Date().getTime();

    if (!this.state.address || !this.state.start || !this.state.end || !this.state.message || !this.state.date)
      return PetDateActions.invalidInfo();

    if (new Date(this.state.date).getTime() < today)
      return PetDateActions.invalidDate();

    if (this.state.address && this.state.start && this.state.end && this.state.message && this.state.date) {
      let data = {
        targetPetId: this.state.petId,
        targetPetOwnerId: this.state.petOwnerId,
        name: this.state.name,
        type: this.state.type,
        address: this.state.address,
        date: this.state.date,
        start: this.state.start,
        end: this.state.end,
        message: this.state.message
      };
      PetDateActions.postInvitation(data);
    }
  }

  render() {

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-offset-2 col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Dating Invitation</div>
              <div className='panel-body'>
                <div className='col-xs-12 col-sm-12'>
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className='form-group'>
                      <label className='control-label'>Name:</label>
                      &nbsp;&nbsp;&nbsp;{this.state.name}
                    </div>
                    <div className='form-group'>
                      <label className='control-label'>Gender:</label>
                      &nbsp;&nbsp;&nbsp;{this.state.gender}
                    </div>
                    <div className='form-group'>
                      <label className='control-label'>Type:</label>
                      &nbsp;&nbsp;&nbsp;{this.state.type}
                    </div>
                    <div className="form-group">
                      <label className="control-label" htmlFor='address'>Address</label>
                      <input id='address' className="form-control" type="text" value={this.state.address} onChange={PetDateActions.updateAddress} required/>
                    </div>
                    <div className="form-group">
                      <label className="control-label" htmlFor='date'>Date</label>
                      <input id='date' className="form-control" type="date" value={this.state.date} onChange={PetDateActions.updateDate} required/>
                    </div>
                    <div className="form-group">
                      <label className="control-label" htmlFor='start'>Start Time</label>
                      <input id='start' className="form-control" type="time" value={this.state.start} onChange={PetDateActions.updateStart} required/>
                    </div>
                    <div className="form-group">
                      <label className="control-label" htmlFor='end'>End Time</label>
                      <input id='end' className="form-control" type="time" value={this.state.end} onChange={PetDateActions.updateEnd} min={this.state.start} required/>
                    </div>
                    <div className='form-group'>
                      <label className='control-label'>Message:</label>
                      <textarea className="form-control" rows="6" style={{resize: 'none'}} value={this.state.message} onChange={PetDateActions.updateMessage}></textarea>
                    </div>
                    <button type='submit' className='btn btn-info' style={{marginRight: '1em'}}>Send</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PetDate;
