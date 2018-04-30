import React from 'react';
import OwnerProfile from './OwnerProfile';
import PetList from './PetList';

class Owner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
        <OwnerProfile id={this.props.params.petOwnerID}/>
        <h4 className='lead'><strong>Pet List</strong></h4>
        <PetList id={this.props.params.petOwnerID}/>
      </div>
    );
  }
}

export default Owner;
