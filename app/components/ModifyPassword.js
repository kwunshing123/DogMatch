import React from 'react';
import ModifyPasswordStore from '../stores/ModifyPasswordStore';
import ModifyPasswordActions from '../actions/ModifyPasswordActions';
import NavbarActions from '../actions/NavbarActions';
import NavbarStore from '../stores/NavbarStore';
import Home from '../components/home/Home';

class ModifyPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = ModifyPasswordStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ModifyPasswordStore.listen(this.onChange);
    NavbarActions.authenticate();
  }

  componentWillUnmount() {
    ModifyPasswordStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.newPassword == '' || this.state.oldPassword == '') {
      ModifyPasswordActions.invalidPassword("Please enter all fields.");
      return;
    }

    if (!(/^([a-zA-Z0-9]{6,})$/.test(this.state.newPassword))) {
      ModifyPasswordActions.invalidPasswordLengthOrCharacter();
      return;
    }

    if (this.state.newPassword != this.state.newPassword1) {
      ModifyPasswordActions.invalidPassword("New password doesn't match. Please try again.");
      return;
    }

    if (this.state.newPassword === this.state.newPassword1 &&
        this.state.oldPassword) {
      ModifyPasswordActions.modifyPassword(this.state.newPassword, this.state.oldPassword);
      return;
    }

  }

  render() {
    return (
      (NavbarStore.state.isAuthorized != true) ? (<Home/>) : (
        <div className='container'>
          <div className='row'>
            <div className='col-md-offset-2 col-sm-8'>
              <div className='panel panel-default'>
                <div className='panel-heading'>Modify your password</div>
                <div className='panel-body'>
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className='form-group'>
                      <label className='control-label'>Old password</label>
                      <input type='password' className='form-control' ref='oldPassword' value={this.state.oldPassword} onChange={ModifyPasswordActions.updateOldPassword} autoFocus/>
                    </div>
                    <div className='form-group '>
                      <label className='control-label'>New password</label>
                      <input type='password' className='form-control' ref='newPassword' value={this.state.newPassword} onChange={ModifyPasswordActions.updateNewPassword} />
                    </div>
                    <div className='form-group '>
                      <label className='control-label'>Confirm new password</label>
                      <input type='password' className='form-control' ref='newPassword1' value={this.state.newPassword1} onChange={ModifyPasswordActions.updateNewPassword1} />
                    </div>
                    <button type='submit' className='btn btn-info'>Save</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default ModifyPassword;
