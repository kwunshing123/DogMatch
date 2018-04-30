import React from 'react';
import {Link} from 'react-router';
import Parties from './Parties';
import NewestPets from './NewestPets';

class Home extends React.Component {

  render() {
    return (
      <div>
        <header className="masthead text-center text-white">
            <div className="row">
              <div>
                <h1 className="text-uppercase text-fade">
                  <strong>Finding friends for your dog </strong>
                </h1>
              </div>
              <div>
                <p className="text-fade">Our mission is to found a right friends for your dogs. Just join us now for your favor pets.</p>
                <Link to="/pets" className="btn btn-transparent">Find Out More</Link>
              </div>
            </div>
        </header>
        <div className='container marginBottom150'>
          <NewestPets />
          <Parties />
        </div>
      </div>
    );
  }
}

export default Home;
