import React from 'react';
import {Link} from 'react-router';
import DatingDetailsActions from '../actions/DatingDetailsActions';
import DatingDetailsStore from '../stores/DatingDetailsStore';

class DatingDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = DatingDetailsStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    DatingDetailsStore.listen(this.onChange);
    DatingDetailsActions.getDatingDetails(this.props.params.datingId);
  }

  componentWillUnmount() {
    DatingDetailsStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  accept(event) {
    event.preventDefault();
    DatingDetailsActions.accept(this.state.datingId);
  }

  reject(event) {
    event.preventDefault();
    DatingDetailsActions.reject(this.state.datingId);
  }

  render() {
    var status;
    switch (this.state.status) {
      case 1:
        if (this.state.isInviter) {
          status = <div className='position' style={{marginLeft: 0, fontSize: '28px', lineHeight: '56px'}}>
                      Waiting for reply
                    </div>
        } else {
          status = <div>
                    <div className='row' style={{marginLeft: 0}}>
                      <form onSubmit={this.accept.bind(this)}>
                        <button type='submit' className='btn btn-success col-sm-4 col-xs-12'>
                          <span className='glyphicon glyphicon-heart'></span> Accept
                        </button>
                      </form>
                      <form onSubmit={this.reject.bind(this)}>
                        <button type='submit' className='btn btn-warning col-sm-4 col-xs-12'>
                          <span className='glyphicon glyphicon-remove'></span> Reject
                        </button>
                      </form>
                    </div>
                    <strong>*Reminder: If you click 'Accept', means you accepted and understanded all the clauses.</strong>
                  </div>
        }
        break;
      case 2:
        status = <div className='position green' style={{marginLeft: 0, fontSize: '28px', lineHeight: '56px'}}>
                    Accepted
                  </div>
        break;
      case 3:
        status = <div className='position red' style={{marginLeft: 0, fontSize: '28px', lineHeight: '56px'}}>
                    Rejected
                  </div>
        break;
    }

    return (
      <div className='container'>
        <div className='well'>
          <div className='clearfix'>
            <div className='row col-sm-offset-1'>
              <div className='col-sm-12'>
                <div className='lead' style={{fontSize: '18px'}}>
                  Date: <strong>{this.state.date}</strong><p/>
                  Start time: <strong>{this.state.start}</strong><p/>
                  End time: <strong>{this.state.end}</strong><p/>
                  Address: <strong>{this.state.address}</strong><p/>
                  Message for you: <strong>{this.state.message}</strong>
                </div>
                <div className='row'>
                  <div className='col-sm-12'>
                    {status}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6'>
            <h4><strong>Inviter</strong></h4>
            <div className='well'>
              <div className='clearfix'>
                <Link to={'/owner/' + this.state.inviter.petOwnerId}>
                  <div className='col-sm-6'>
                    <h4><strong>Owner</strong></h4>
                    <img className='thumb-lg' src={this.state.inviter.iconImage} />
                    <div className='lead' style={{fontSize: '18px'}}>
                      Name: <strong>{this.state.inviter.name}</strong><p/>
                      Gender: <strong>{this.state.inviter.gender}</strong><p/>
                      Country: <strong>{this.state.inviter.country}</strong><p/>
                      Birthday: <strong>{this.state.inviter.birthday}</strong>
                    </div>
                  </div>
                </Link>
                <Link to={'/pet/' + this.state.inviterPet.petId}>
                  <div className='col-sm-6'>
                    <h4><strong>Pet</strong></h4>
                    <img className='thumb-lg' src={this.state.inviterPet.iconImage} />
                    <div className='lead' style={{fontSize: '18px'}}>
                      Name: <strong>{this.state.inviterPet.name}</strong><p/>
                      Gender: <strong>{this.state.inviterPet.gender}</strong><p/>
                      Type: <strong>{this.state.inviterPet.type}</strong><p/>
                      Birthday: <strong>{this.state.inviterPet.birthday}</strong>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className='col-sm-6'>
            <h4><strong>Invitee</strong></h4>
            <div className='well'>
              <div className='clearfix'>
                <Link to={'/owner/' + this.state.invitee.petOwnerId}>
                  <div className='col-sm-6'>
                    <h4><strong>Owner</strong></h4>
                    <img className='thumb-lg' src={this.state.invitee.iconImage} />
                    <div className='lead' style={{fontSize: '18px'}}>
                      Name: <strong>{this.state.invitee.name}</strong><p/>
                      Gender: <strong>{this.state.invitee.gender}</strong><p/>
                      Country: <strong>{this.state.invitee.country}</strong><p/>
                      Birthday: <strong>{this.state.invitee.birthday}</strong>
                    </div>
                  </div>
                </Link>
                <Link to={'/pet/' + this.state.inviteePet.petId}>
                  <div className='col-sm-6'>
                    <h4><strong>Pet</strong></h4>
                    <img className='thumb-lg' src={this.state.inviteePet.iconImage} />
                    <div className='lead' style={{fontSize: '18px'}}>
                      Name: <strong>{this.state.inviteePet.name}</strong><p/>
                      Gender: <strong>{this.state.inviteePet.gender}</strong><p/>
                      Type: <strong>{this.state.inviteePet.type}</strong><p/>
                      Birthday: <strong>{this.state.inviteePet.birthday}</strong>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DatingDetails;
