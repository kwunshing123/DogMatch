import React from 'react';
import OwnerProfileStore from '../../stores/OwnerProfileStore';
import OwnerProfileActions from '../../actions/OwnerProfileActions';
import {Link} from 'react-router';

class OwnerProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = OwnerProfileStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    OwnerProfileStore.listen(this.onChange);
    OwnerProfileActions.getOwner(this.props.id);

    $('.magnific-popup').magnificPopup({
      type: 'image',
      mainClass: 'mfp-zoom-in',
      closeOnContentClick: true,
      midClick: true,
      zoom: {
        enabled: true,
        duration: 300
      }
    });
  }

  componentWillUnmount() {
    OwnerProfileStore.unlisten(this.onChange);
    $(document.body).removeClass();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) OwnerProfileActions.getOwner(this.props.id);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className='well profile'>
        <div className='row' style={{marginLeft: 0, marginRight: 0}}>
          <div className='profile-img col-xs-12 col-sm-2 col-sm-offset-3' style={{paddingLeft: 0}}>
            <a className='magnific-popup' href={this.state.iconImage}>
              <img src={this.state.iconImage} width='256px' height='256px'/>
            </a>
          </div>
          <div className='clearfix col-xs-12 col-sm-6'>
            <h2><strong>{this.state.name}</strong></h2>
            <h4 className='lead'>
            Gender: <strong>{this.state.gender}</strong><p/>
            Country: <strong>{this.state.country}</strong><p/>
            Birthday: <strong>{this.state.birthday}</strong><p/>
            Member Since: {this.state.memberSince}</h4><p/>
            {this.state.owned ?
              <Link to={"/owner/"+ this.state.petOwnerId + "/edit"} className='btn btn-success'>Edit My Profile</Link>
              :
              <span></span>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default OwnerProfile;
