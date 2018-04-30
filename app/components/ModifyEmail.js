import React from 'react';
import ModifyEmailStore from '../stores/ModifyEmailStore';
import ModifyEmailActions from '../actions/ModifyEmailActions';
import NavbarActions from '../actions/NavbarActions';
import NavbarStore from '../stores/NavbarStore';
import Home from '../components/home/Home';

class ModifyEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = ModifyEmailStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ModifyEmailStore.listen(this.onChange);
    NavbarActions.authenticate();
  }

  componentWillUnmount() {
    ModifyEmailStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.newEmail == '' || this.state.newEmail1 == '') {
      return toastr.error("Please enter all fields.");
    }

    if (this.state.newEmail != this.state.newEmail1) {
      return toastr.error("New email doesn't match. Please try again.");
    }
    ModifyEmailActions.modifyEmail(this.state.newEmail);
  }

  render() {
    return (
      (NavbarStore.state.isAuthorized != true) ? (<Home/>) : (
        <div className='container'>
          <div className='row'>
            <div className='col-md-offset-2 col-sm-8'>
              <div className='panel panel-default'>
                <div className='panel-heading'>Modify email</div>
                <div className='panel-body'>
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className='form-group '>
                      <label className='control-label'>New email</label>
                      <input type='email' className='form-control' ref='newEmail' value={this.state.newEmail} onChange={ModifyEmailActions.updateNewEmail} />
                    </div>
                    <div className='form-group '>
                      <label className='control-label'>Confirm new email</label>
                      <input type='email' className='form-control' ref='newEmail1' value={this.state.newEmail1} onChange={ModifyEmailActions.updateNewEmail1} />
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

export default ModifyEmail;
