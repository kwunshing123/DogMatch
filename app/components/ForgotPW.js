import React from 'react';
import ForgotPWStore from '../stores/ForgotPWStore';
import ForgotPWActions from '../actions/ForgotPWActions';
import NavbarActions from '../actions/NavbarActions';
import NavbarStore from '../stores/NavbarStore';
import {Link} from 'react-router';
import Home from '../components/home/Home';

class ForgotPW extends React.Component {
  constructor(props) {
    super(props);
    this.state = ForgotPWStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ForgotPWStore.listen(this.onChange);
    NavbarActions.authenticate();
  }

  componentWillUnmount() {
    ForgotPWStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    var email = this.state.email.trim();
    if (!email) {
      this.refs.emailTextField.focus();
    }
    if (email) {
      ForgotPWActions.fotgotPassword(email);
    }
  }

  render() {
    return (
      (NavbarStore.state.isAuthorized == true) ? (<Home/>) : (
        <div className='container'>
          <div className='row'>
            <div className='col-md-offset-2 col-sm-8'>
              <div className='panel panel-default'>
                <div className='panel-heading'>Forgot Password</div>
                <div className='panel-body'>
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className='form-group'>
                      <label className='control-label'>Please enter your <strong>Email or User Name</strong></label>
                      <input type='text' className='form-control' ref='emailTextField' value={this.state.email} onChange={ForgotPWActions.updateEmail} autoFocus/>
                    </div>
                    <button type='submit' className='btn btn-success'>Submit</button>
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

export default ForgotPW;
