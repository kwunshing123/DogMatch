import React from 'react';
import PetProfileStore from '../../stores/PetProfileStore';
import PetProfileActions from '../../actions/PetProfileActions';
import {Link} from 'react-router';

class PetProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = PetProfileStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PetProfileStore.listen(this.onChange);
    PetProfileActions.getPet(this.props.id);
    PetProfileActions.getAttendedParties(this.props.id, 0, 0);

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
    PetProfileStore.unlisten(this.onChange);
    $(document.body).removeClass();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) PetProfileActions.getPet(this.props.id);
  }

  onChange(state) {
    this.setState(state);
  }

  followsPet(event) {
    event.preventDefault();
    PetProfileActions.followsPet(this.state.petId);
  }

  unfollowsPet(event) {
    event.preventDefault();
    PetProfileActions.unfollowsPet(this.state.petId);
  }

  datePet(event) {
    event.preventDefault();
    if (this.state.havePet) window.location.href ="/pet/"+ this.state.petId + "/date";
    toastr.warning("Please login your account or add your dog first");
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
            <h4 className='lead'>Owner: <strong><Link to={"/owner/"+ this.state.petOwnerId}>{this.state.owner}</Link></strong><p/>
            Type: <strong>{this.state.type}</strong><p/>
            Gender: <strong>{this.state.gender}</strong><p/>
            Birthday: <strong>{this.state.birthday}</strong><p/>
            Introduction: {this.state.introduction}</h4><p/>
            {this.state.owned ?
              <Link to={"/pet/"+ this.state.petId + "/edit"} className='btn btn-success'>
                <span className='glyphicon glyphicon-pencil'></span>
                Edit Pet Profile
              </Link>
              :
              <div>
                {this.state.isFollowed ? (
                  <form onSubmit={this.unfollowsPet.bind(this)} className='col-sm-4'>
                    <button type='submit' className='btn btn-transparent col-xs-12'>
                      Unfollows
                    </button>
                  </form>) : (
                  <form onSubmit={this.followsPet.bind(this)} className='col-sm-4'>
                    <button type='submit' className='btn btn-info col-xs-12'>
                      <span className='glyphicon glyphicon-star'></span>
                      Follows
                    </button>
                  </form>
                )}
                <button onClick={this.datePet.bind(this)} className='btn btn-danger col-sm-4'>
                  <span className='glyphicon glyphicon-heart'></span>Date
                </button>
              </div>
            }
          </div>
        </div>
        <div className='row'>
          <div className='profile-stats clearfix'>
            <ul>
              <li className='col-sm-4 green'>
                <span className='stats-number'>{this.state.partiesJoined}</span>
                <span className='glyphicon glyphicon-glass'></span>
                <strong>Parties Joined</strong>
              </li>
              <li className='col-sm-4 orange'>
                <span className='stats-number'>{this.state.followers.length}</span>
                <span className='glyphicon glyphicon-star'></span>
                <strong>Followers</strong>
              </li>
              <li className='col-sm-4 red'>
                <span className='stats-number'>{this.state.dating}</span>
                <span className='glyphicon glyphicon-heart'></span>
                <strong>Dating</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default PetProfile;
