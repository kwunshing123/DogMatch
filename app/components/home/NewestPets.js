import React from 'react';
import {Link} from 'react-router';
import NewestPetsActions from '../../actions/NewestPetsActions';
import NewestPetsStore from '../../stores/NewestPetsStore';

class NewestPets extends React.Component {
  constructor(props) {
    super(props);
    this.state = NewestPetsStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    NewestPetsStore.listen(this.onChange);
    NewestPetsActions.getNewestPets();
  }

  componentWillUnmount() {
    NewestPetsStore.unlisten(this.onChange);
    $(document.body).removeClass();
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    if(this.state.newPets.length) {
      var newPetList = this.state.newPets.map((pet, index) => {
        return (
          <Link to={'/pet/' + pet.petId} key={pet.petId}>
            <div className='col-md-8 col-lg-4'>
                 <div className='well profile row' style={{minHeight: 270}}>
                      <div className='col-sm-12 row'>
                          <div className='col-xs-7 col-sm-7'>
                              <h3><strong>{pet.name}</strong></h3><p/>
                              <strong>Gender: </strong> {pet.gender}<p/>
                              <strong>Type: </strong> {pet.type}<p/>
                          </div>
                          <div className='col-xs-5 col-sm-5 text-center'>
                              <figure>
                                  <div className="circle-avatar" style={{backgroundImage: "url(" + pet.iconImage + ")"}}></div>
                              </figure>
                          </div>
                      </div>
                      <div className='divider text-center row'>
                        <div className='col-xs-6 col-sm-6 emphasis'>
                            <h2><strong>{pet.age} </strong></h2>
                            <h4><span className="label label-success">&nbsp;&nbsp;Age&nbsp;&nbsp;</span></h4>
                        </div>
                        <div className='col-xs-6 col-sm-6 emphasis'>
                            <h2><strong>{pet.followers.length} </strong></h2>
                            <h4><span className="label label-info"> Followers </span></h4>
                        </div>
                      </div>
                 </div>
              </div>
            </Link>
          );
        });
    }

    return (
    <div className='row'>
      <div className="page-header">
        <h3><strong>Newest Dogs</strong></h3>
      </div>
      {newPetList}
    </div>
    );
  }
}

export default NewestPets;
