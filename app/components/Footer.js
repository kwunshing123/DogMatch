import React from 'react';
import {Link} from 'react-router';

class Footer extends React.Component {

  render() {
    return (
      <footer>
        <div className='container marginBottom0'>
          <div className='row'>
            <div className='col-sm-5'>
              <h3 className='lead'><strong>DogMatch</strong></h3>
              <p>Please don't forget, there is a slight risk during the dating, even owners are watching. And pet owners should take the best duty to avoid the accident. Also, owners should ensure that the risks involved are fully understood, seeking advice if necessary.</p>
              <p>© 2018 DogMatch.</p>
            </div>
            <div className='col-sm-4'>
              <h3 className='lead'><strong>Contact Us</strong></h3>
              <p>If you have any enquiry, please contact us through email.</p>
              <p><span className='glyphicon glyphicon-envelope'></span> <strong>petdate0@gmail.com</strong></p>
            </div>
            <div className='col-sm-3'>
              <div className='row'>
                <div className='col-sm-6'>
                  <Link to='/terms' style={{textDecoration: 'none'}}><h4 className='lead'><strong>Terms and conditions</strong></h4></Link>
                </div>
                <div className='col-sm-6'>
                  <Link to='/privacy' style={{textDecoration: 'none'}}><h4 className='lead'><strong>Privacy</strong></h4></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
