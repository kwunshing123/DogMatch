import React from 'react';
import Home from '../components/home/Home';
import ForgotPWConfirmCodeActions from '../actions/ForgotPWConfirmCodeActions';
import ForgotPWConfirmCodeStore from '../stores/ForgotPWConfirmCodeStore';

class ForgotPWConfirmCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = ForgotPWConfirmCodeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ForgotPWConfirmCodeStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ForgotPWConfirmCodeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!(/^([a-zA-Z0-9]{6,})$/.test(this.state.newPassword))) {
      ForgotPWConfirmCodeActions.invalidPasswordLengthOrCharacter();
      this.refs.newPassword.focus();
      return;
    }

    if (this.state.newPassword == '' || this.state.newPassword1 == '') {
      ForgotPWConfirmCodeActions.invalidPassword("Please enter all fields.");
      return;
    }

    if (this.state.newPassword != this.state.newPassword1) {
      ForgotPWConfirmCodeActions.invalidPassword("New password doesn't match. Please try again.");
      return;
    }

    if (this.state.newPassword === this.state.newPassword1) {
      ForgotPWConfirmCodeActions.modifyPassword(this.state.newPassword, this.props.params.confirmCode);
      return;
    }

  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-md-offset-2 col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Modify your password</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className='form-group '>
                    <label className='control-label'>New password</label>
                    <input type='password' className='form-control' ref='newPassword' value={this.state.newPassword} onChange={ForgotPWConfirmCodeActions.updateNewPassword} />
                  </div>
                  <div className='form-group '>
                    <label className='control-label'>Confirm new password</label>
                    <input type='password' className='form-control' ref='newPassword1' value={this.state.newPassword1} onChange={ForgotPWConfirmCodeActions.updateNewPassword1} />
                  </div>
                  <button type='submit' className='btn btn-info'>Save</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPWConfirmCode;
