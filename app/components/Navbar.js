import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = NavbarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    NavbarStore.listen(this.onChange);
    NavbarActions.authenticate();

    $(document).ajaxStart(() => {
      NavbarActions.updateAjaxAnimation('fadeIn');
    });

    $(document).ajaxComplete(() => {
      setTimeout(() => {
        NavbarActions.updateAjaxAnimation('fadeOut');
      }, 750);
    });
  }

  componentWillUnmount() {
    NavbarStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  logout(){
    NavbarActions.logout();
  }

  render() {
    if (this.state.petId) {
      var currentPet = this.state.pets.map((pet, index) => {
        if (pet.petId == this.state.petId)
          return (
            <Link to='#' className='dropdown-toggle' data-toggle='dropdown' key={pet.petId}>
              <img className='thumb-lg' style={{width: '20px'}} src={pet.iconImage}/>
              {pet.name} <span className='caret'></span>
            </Link>
          );
      });
    } else {
      currentPet = <Link to='/pet/new' className='btn btn-warning'><strong>Add your dog</strong></Link>
    }

    if(this.state.pets.length > 1) {
      var pets = this.state.pets.map((pet, index) => {
        if (pet.petId != this.state.petId)
          return (
            <li key={pet.petId}>
              <Link to='#' onClick={() => { NavbarActions.changesPet(pet.petId) }} >
                <img className='thumb-lg' style={{width: '20px'}} src={pet.iconImage}/>{pet.name}
              </Link>
            </li>
          );
      });
      var petList = <ul className='dropdown-menu'>
                      {pets}
                    </ul>
    }

    if (this.state.isAuthorized) {
      var support = <li><Link to='/support'>Support</Link></li>;
      var rightButton = <ul className='nav navbar-nav navbar-right'>
                          <li className='dropdown'>
                            {currentPet}
                            {petList}
                          </li>
                          <li className='dropdown'>
                            <Link to='#' className='dropdown-toggle' data-toggle='dropdown'>
                              {this.state.userName}
                              <span className='badge badge-up badge-danger'>{this.state.unreadNotification}</span>
                              <span className='caret'></span>
                            </Link>
                            <ul className='dropdown-menu'>
                              <li><Link to={"/owner/"+ this.state.petOwnerId + "/edit"}>My Profile</Link></li>
                              <li><Link to="/owner/pets">My Dog(s)</Link></li>
                              <li><Link to={"/owner/following"}>Following</Link></li>
                              <li><Link to={"/pets/dating"}>Dating</Link></li>
                              <li><Link to={"/owner/notifications"}>Notifications<span className='pull-right badge badge-danger'>{this.state.unreadNotification}</span></Link></li>
                            </ul>
                          </li>
                          <li><Link to='' onClick={() => { this.logout() }} className='btn btn-info'>LOG OUT</Link></li>
                        </ul>;
    } else {
      rightButton = <ul className='nav navbar-nav navbar-right'>
                      <li><Link to='/login' className='btn btn-success'>SIGN IN</Link></li>
                      <li><Link to='/signup' className='regLink'>Have not an account yet?</Link></li>
                    </ul>
    }

    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <div className='navbar-header'>
          <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <Link to='/' className='navbar-brand'>
            <span ref='triangles' className={'triangles animated ' + this.state.ajaxAnimationClass}>
              <div className='tri invert'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
            </span>
            <img className='icon' /> DogMatch
          </Link>
        </div>
        <div id='navbar' className='navbar-collapse collapse'>
          <ul className='nav navbar-nav'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/pets'>All Dogs</Link></li>
            <li><Link to='/parties'>Parties</Link></li>
            <li><Link to='/stars'>Dog Stars</Link></li>
            {support}
          </ul>
          {rightButton}
        </div>
      </nav>
    );
  }
}

export default Navbar;
