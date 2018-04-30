import React from 'react';
import SignUpStore from '../stores/SignUpStore';
import SignUpActions from '../actions/SignUpActions';
import NavbarActions from '../actions/NavbarActions';
import NavbarStore from '../stores/NavbarStore';
import {Link} from 'react-router';
import Home from '../components/home/Home';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = SignUpStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SignUpStore.listen(this.onChange);
    NavbarActions.authenticate();
  }

  componentWillUnmount() {
    SignUpStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var email = this.state.email.trim();

    if (!email) {
      SignUpActions.invalidEmail();
      this.refs.emailTextField.focus();
      return;
    }

    if (!(/^([a-zA-Z0-9]{6,})$/.test(this.state.password))) {
      SignUpActions.invalidPasswordLengthOrCharacter();
      this.refs.passwordField.focus();
      return;
    }

    if (this.state.password != this.state.password1) {
      SignUpActions.invalidPassword();
      this.refs.passwordField.focus();
      return;
    }

    if (!this.state.mailValidationState && !this.state.passwordValidationState) {
      SignUpActions.signUp(email, this.state.password);
    }

  }

  render() {
    return (
    (NavbarStore.state.isAuthorized == true) ? (<Home/>) : (
      <div className='container marginBottom350'>
        <div className='row'>
          <div className='col-md-offset-2 col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Sign Up</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className='form-group'>
                    <label className='control-label'>Email</label>
                    <input type='email' className='form-control' ref='emailTextField' value={this.state.email} onChange={SignUpActions.updateEmail} autoFocus/>
                  </div>
                  <div className='form-group '>
                    <label className='control-label'>Password</label>
                    <input type='password' className='form-control' ref='passwordField' value={this.state.password} onChange={SignUpActions.updatePassword} />
                  </div>
                  <div className='form-group '>
                    <label className='control-label'>Confirm Password</label>
                    <input type='password' className='form-control' ref='passwordField1' value={this.state.password1} onChange={SignUpActions.updatePassword1} />
                  </div>
                  <div className='form-group '>
                    <input type='checkbox' checked={this.state.agree} onChange={SignUpActions.updateAgree} required/> I agree to the <Link to='/terms' style={{color: '#0085ff'}}> terms of service</Link>
                  </div>
                  <button type='submit' className='btn btn-info'>Sign Up</button>
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

export default SignUp;
