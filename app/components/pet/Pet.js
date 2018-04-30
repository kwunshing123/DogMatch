import React from 'react';
import Comment from './Comment';
import PetProfile from './PetProfile';
import PetComments from './PetComments';
import AttendedParties from './AttendedParties';
import NavbarStore from '../../stores/NavbarStore';

class Pet extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
        <PetProfile id={this.props.params.petID}/>
        {(NavbarStore.getState().isAuthorized) ?
          (<div>
            <h4 className='lead'><strong>Leave your comment</strong></h4>
            <Comment id={this.props.params.petID}/>
          </div>)
          : (<span></span>)}
        <h4 className='lead'><strong>Recently Comments</strong></h4>
        <PetComments id={this.props.params.petID}/>
        <h4 className='lead'><strong>Attended Parties</strong></h4>
        <AttendedParties id={this.props.params.petID}/>
      </div>
    );
  }
}

export default Pet;
