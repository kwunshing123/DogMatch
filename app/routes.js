import React from 'react';
import {Route} from 'react-router';
import App from './components/App';

import ActivateCode from './components/ActivateCode';
import DatingDetails from './components/DatingDetails';
import DatingList from './components/DatingList';
import FollowingList from './components/FollowingList';
import ForgotPW from './components/ForgotPW';
import ForgotPWConfirmCode from './components/ForgotPWConfirmCode';
import Home from './components/home/Home';
import Login from './components/Login';
import MyPetList from './components/MyPetList';
import ModifyPassword from './components/ModifyPassword';
import ModifyEmail from './components/ModifyEmail';
import Notifications from './components/Notifications';
import Owner from './components/owner/Owner';
import OwnerEdit from './components/OwnerEdit';
import PartyList from './components/PartyList';
import Party from './components/party/Party';
import Pet from './components/pet/Pet';
import PetDate from './components/PetDate';
import PetEdit from './components/PetEdit';
import PetList from './components/PetList';
import PetNew from './components/PetNew';
import Privacy from './components/Privacy';
import Stars from './components/Stars';
import SignUp from './components/SignUp';
import Support from './components/Support';
import Terms from './components/Terms';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/activate/:activateCode' component={ActivateCode} />
    <Route path='/dating/:datingId' component={DatingDetails} />
    <Route path='/forgotpassword/' component={ForgotPW} />
    <Route path='/forgotpassword/:confirmCode' component={ForgotPWConfirmCode} />
    <Route path='/login' component={Login} />
    <Route path='/logout' component={Home}/>
    <Route path='/owner/pets' component={MyPetList} />
    <Route path='/owner/following' component={FollowingList} />
    <Route path='/owner/notifications' component={Notifications} />
    <Route path='/owner/:id/edit' component={OwnerEdit} />
    <Route path='/owner/modifyEmail' component={ModifyEmail} />
    <Route path='/owner/modifyPassword' component={ModifyPassword} />
    <Route path='/owner/:petOwnerID' component={Owner} />
    <Route path='/party/:partyId' component={Party} />
    <Route path='/parties' component={PartyList} />
    <Route path='/pets' component={PetList} />
    <Route path='/pet/new' component={PetNew} />
    <Route path='/pet/:petID' component={Pet} />
    <Route path='/pet/:petID/edit' component={PetEdit} />
    <Route path='/pet/:petID/date' component={PetDate} />
    <Route path='/pets/dating' component={DatingList} />
    <Route path='/privacy' component={Privacy} />
    <Route path='/stars' component={Stars} />
    <Route path='/signup' component={SignUp} />
    <Route path='/support' component={Support} />
    <Route path='/terms' component={Terms} />
  </Route>
);
