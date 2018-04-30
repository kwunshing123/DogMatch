import React from 'react';
import LoginStore from '../stores/LoginStore';
import LoginActions from '../actions/LoginActions';
import NavbarActions from '../actions/NavbarActions';
import NavbarStore from '../stores/NavbarStore';
import {Link} from 'react-router';
import Home from '../components/home/Home';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = LoginStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    LoginStore.listen(this.onChange);
    NavbarActions.authenticate();
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    var email = this.state.email.trim();
    var password = this.state.password;

    if (!email) {
      this.refs.emailTextField.focus();
    }

    if (email && password) {
      LoginActions.Login(email, password);
    }
  }

  render() {
    return (
      (NavbarStore.state.isAuthorized == true) ? (<Home/>) : (
        <div className='container'>
          <div className='row'>
            <div className='col-md-offset-2 col-sm-8'>
              <div className='panel panel-default'>
                <div className='panel-heading'>Sign In</div>
                <div className='panel-body'>
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className='form-group'>
                      <label className='control-label'>Email or User Name</label>
                      <input type='text' className='form-control' ref='emailTextField' value={this.state.name} onChange={LoginActions.updateEmail} autoFocus/>
                    </div>
                    <div className='form-group '>
                      <label className='control-label'>Password</label>
                      <input type='password' className='form-control' ref='passwordField' value={this.state.password} onChange={LoginActions.updatePassword}/>
                    </div>
                    <div className='form-group '>
                      <Link to='/forgotpassword/' style={{color: '#0085ff'}}>Forgot password?</Link>
                    </div>
                    <button type='submit' className='btn btn-success'>Login</button>
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

export default Login;
