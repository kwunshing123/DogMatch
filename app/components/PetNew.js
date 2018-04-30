import React from 'react';
import PetNewStore from '../stores/PetNewStore';
import PetNewActions from '../actions/PetNewActions';

class PetNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = PetNewStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PetNewStore.listen(this.onChange);
  }

  componentWillUnmount() {
    PetNewStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.name || !this.state.gender || !this.state.type || !this.state.introduction || !this.state.birthday || !this.state.iconImage)
      return PetNewActions.invalidInfo();

    if (this.state.name && this.state.gender && this.state.type && this.state.introduction && this.state.birthday && this.state.iconImage) {
      let data = {
        name: this.state.name,
        gender: this.state.gender,
        type: this.state.type,
        birthday: this.state.birthday,
        introduction: this.state.introduction,
        iconImage: this.state.iconImage
      };
      PetNewActions.updateInfo(data);
    }
  }

  render() {
    var imagePreview = null;
    if (this.state.iconImage) imagePreview = (<img src={this.state.iconImage} className='img-responsive' style={{maxWidth: '200px', maxHeight: '200px'}}/>);

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-offset-2 col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Add a dog</div>
                <div className='panel-body'>
                  <div className='row'>
                    <form onSubmit={this.handleSubmit.bind(this)} encType="multipart/form-data">
                      <div className='col-xs-12 col-sm-6'>
                        <figure>
                          {imagePreview}
                        </figure>
                          <div className='form-group'>
                            <label className='control-label'>Dog Icon</label>
                            <input name="iconImage" type="file" onChange={PetNewActions.updateIconImage} />
                          </div>
                          <small>*Only accept <strong>png, jpg or jpeg</strong> format.<br/>
                                 *Maxium image are <strong>300KB</strong>.<p/>
                          </small>
                      </div>
                      <div className='col-xs-12 col-sm-6'>
                        <div className='form-group'>
                          <label className='control-label'>Name</label>
                          <input type='text' className='form-control' ref='Name' value={this.state.name} onChange={PetNewActions.updateName} />
                        </div>
                        <div className='form-group'>
                          <label className='control-label'>Gender</label>
                          <div className='row marginLR0'>
                            <div className='radio radio-inline'>
                              <input type='radio' name='gender' id='female' value='Female' checked={this.state.gender === 'Female'}
                                     onChange={PetNewActions.updateGender} />
                              <label htmlFor='female'>Female</label>
                            </div>
                            <div className='radio radio-inline'>
                              <input type='radio' name='gender' id='male' value='Male' checked={this.state.gender === 'Male'}
                                     onChange={PetNewActions.updateGender} />
                              <label htmlFor='male'>Male</label>
                            </div>
                          </div>
                        </div>
                        <div className='form-group'>
                          <label className='control-label'>Type</label>
                          <input type='text' className='form-control' ref='userName' value={this.state.type} onChange={PetNewActions.updateType} />
                        </div>
                        <div className="form-group">
                          <label className="control-label" htmlFor='birthday'>Birthday</label>
                          <input id='birthday' className="form-control" type="date" value={this.state.birthday} onChange={PetNewActions.updateBirthday} />
                        </div>
                        <div className='form-group'>
                          <label className='control-label'>Introduction:</label>
                          <textarea className="form-control" rows="6" style={{resize: 'none'}} value={this.state.introduction} onChange={PetNewActions.updateIntroduction}></textarea>
                        </div>
                        <button type='submit' className='btn btn-info' style={{marginRight: '1em'}}>Save</button>
                      </div>
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

export default PetNew;
