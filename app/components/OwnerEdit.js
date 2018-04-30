import React from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import {Link} from 'react-router';
import OwnerEditStore from '../stores/OwnerEditStore';
import OwnerEditActions from '../actions/OwnerEditActions';

class OwnerEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = OwnerEditStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    OwnerEditActions.getInfo(this.props.params.id);
    OwnerEditStore.listen(this.onChange);
  }

  componentWillUnmount() {
    OwnerEditStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.userName || !this.state.gender || !this.state.country || !this.state.birthday) return OwnerEditActions.invalidInfo();

    if (this.state.userName && this.state.gender && this.state.country && this.state.birthday) {
      let data = {
        petOwnerId: this.state.petOwnerId,
        userName: this.state.userName,
        gender: this.state.gender,
        birthday: this.state.birthday,
        country: this.state.country
      };
      OwnerEditActions.updateInfo(data);
    }
  }

  handleImageSubmit(event) {
    event.preventDefault();
    OwnerEditActions.updateImage(this.state.iconImage);
  }

  handleImageChange(event) {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        iconImage: reader.result
      });
    }
    reader.readAsDataURL(file)
  }

  render() {
    var imagePreview = null;
    if (this.state.iconImage) imagePreview = (<img src={this.state.iconImage} className='img-responsive' style={{maxWidth: '200px', maxHeight: '200px'}}/>);

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-offset-2 col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>My Profile</div>
              <div className='panel-body'>
                <div className='row'>
                  <div className='col-xs-12 col-sm-6'>
                    <figure>
                      {imagePreview}
                    </figure>
                    <form onSubmit={this.handleImageSubmit.bind(this)} encType="multipart/form-data">
                      <div className='form-group'>
                        <label className='control-label'>Profile Image</label>
                        <input name="iconImage" type="file" onChange={this.handleImageChange.bind(this)} />
                      </div>
                      <small>*Only accept <strong>png, jpg or jpeg</strong> format.<br/>
                             *Maxium image are <strong>300KB</strong>.<p/>
                      </small>
                      <button type='submit' className='btn btn-info'>Update Profile Image</button>
                    </form>
                  </div>
                  <div className='col-xs-12 col-sm-6'>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                      <div className='form-group'>
                        <label className='control-label'>User Name</label>
                        <input type='text' className='form-control' ref='userName' value={this.state.userName} onChange={OwnerEditActions.updateUserName} autoFocus/>
                      </div>
                      <div className='form-group'>
                        <label className='control-label'>Gender</label>
                        <div className='row marginLR0'>
                          <div className='radio radio-inline'>
                            <input type='radio' name='gender' id='female' value='Female' checked={this.state.gender === 'Female'}
                                   onChange={OwnerEditActions.updateGender} />
                            <label htmlFor='female'>Female</label>
                          </div>
                          <div className='radio radio-inline'>
                            <input type='radio' name='gender' id='male' value='Male' checked={this.state.gender === 'Male'}
                                   onChange={OwnerEditActions.updateGender} />
                            <label htmlFor='male'>Male</label>
                          </div>
                        </div>
                      </div>
                      <div className='form-group '>
                        <label className='control-label'>Country</label><br/>
                        <CountryDropdown classes='maxWidth100' showDefaultOption={false} value={this.state.country} onChange={(val) => OwnerEditActions.selectCountry(val)} />
                      </div>
                      <div className="form-group">
                        <label className="control-label" htmlFor='birthday'>Birthday</label>
                        <input id='birthday' className="form-control" type="date" value={this.state.birthday} onChange={OwnerEditActions.updateBirthday} />
                      </div>
                      <button type='submit' className='btn btn-info' style={{marginRight: '1em'}}>Save</button>
                      <Link to={'/owner/modifyEmail'} className='btn btn-info' style={{marginRight: '1em'}}>Modify Email</Link>
                      <Link to={'/owner/modifyPassword'} className='btn btn-info'>Modify Password</Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OwnerEdit;
