import React from 'react';
import {Link} from 'react-router';
import PetEditStore from '../stores/PetEditStore';
import PetEditActions from '../actions/PetEditActions';

class PetEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = PetEditStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PetEditActions.getInfo(this.props.params.petID);
    PetEditStore.listen(this.onChange);
  }

  componentWillUnmount() {
    PetEditStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.name || !this.state.gender || !this.state.type || !this.state.introduction || !this.state.birthday)
      return PetEditActions.invalidInfo();

    if (this.state.name && this.state.gender && this.state.type && this.state.introduction && this.state.birthday) {
      let data = {
        petId: this.state.petId,
        name: this.state.name,
        gender: this.state.gender,
        type: this.state.type,
        birthday: this.state.birthday,
        introduction: this.state.introduction
      };
      PetEditActions.updateInfo(data);
    }
  }

  handleImageSubmit(event) {
    event.preventDefault();
    PetEditActions.updateImage({petId: this.state.petId, image: this.state.iconImage});
  }

  render() {
    var imagePreview = null;
    if (this.state.iconImage) imagePreview = (<img src={this.state.iconImage} className='img-responsive' style={{maxWidth: '200px', maxHeight: '200px'}}/>);

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-offset-2 col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>My Dog</div>
              <div className='panel-body'>
                <div className='row'>
                  <div className='col-xs-12 col-sm-6'>
                    <figure>
                      {imagePreview}
                    </figure>
                    <form onSubmit={this.handleImageSubmit.bind(this)} encType="multipart/form-data">
                      <div className='form-group'>
                        <label className='control-label'>Dog Icon</label>
                        <input name="iconImage" type="file" onChange={PetEditActions.updateIconImage} />
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
                        <label className='control-label'>Name</label>
                        <input type='text' className='form-control' ref='Name' value={this.state.name} onChange={PetEditActions.updateName} />
                      </div>
                      <div className='form-group'>
                        <label className='control-label'>Gender</label>
                        <div className='row marginLR0'>
                          <div className='radio radio-inline'>
                            <input type='radio' name='gender' id='female' value='Female' checked={this.state.gender === 'Female'}
                                   onChange={PetEditActions.updateGender} />
                            <label htmlFor='female'>Female</label>
                          </div>
                          <div className='radio radio-inline'>
                            <input type='radio' name='gender' id='male' value='Male' checked={this.state.gender === 'Male'}
                                   onChange={PetEditActions.updateGender} />
                            <label htmlFor='male'>Male</label>
                          </div>
                        </div>
                      </div>
                      <div className='form-group'>
                        <label className='control-label'>Type</label>
                        <input type='text' className='form-control' ref='userName' value={this.state.type} onChange={PetEditActions.updateType} />
                      </div>
                      <div className="form-group">
                        <label className="control-label" htmlFor='birthday'>Birthday</label>
                        <input id='birthday' className="form-control" type="date" value={this.state.birthday} onChange={PetEditActions.updateBirthday} />
                      </div>
                      <div className='form-group'>
                        <label className='control-label'>Introduction:</label>
                        <textarea className="form-control" rows="6" style={{resize: 'none'}} value={this.state.introduction} onChange={PetEditActions.updateIntroduction}></textarea>
                      </div>
                      <button type='submit' className='btn btn-info' style={{marginRight: '1em'}}>Save</button>
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

export default PetEdit;
