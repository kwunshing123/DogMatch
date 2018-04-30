import React from 'react';
import ReactPaginate from 'react-paginate';
import {Link} from 'react-router';
import NotificationStore from '../stores/NotificationStore';
import NotificationActions from '../actions/NotificationActions';
import NavbarActions from '../actions/NavbarActions';

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = NotificationStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    NotificationStore.listen(this.onChange);
    NotificationActions.getNotifications(0, 10);
  }

  componentWillUnmount() {
    NotificationStore.unlisten(this.onChange);
    $(document.body).removeClass();
  }

  onChange(state) {
    this.setState(state);
  }

  handlePageClick(data) {
    let selected = data.selected;
    NavbarActions.getUnreadNotification();
      this.setState(() => {
        NotificationActions.getNotifications(selected, 10);
      });
  };

  deleteNotification(event) {
    event.preventDefault();
    NotificationActions.deleteNotification(event.target.id);
  }

  render() {
    if(this.state.notifications.length) {
      var notification = this.state.notifications.map((notification, index) => {
        if (notification.senderId == 0) notification.sender = "System Message";
        var content;
        switch (notification.message[0].type) {
          case "invitation":
            content = <div className='media-body'>
                            <strong>{notification.sender}</strong> said:<br/>
                            <Link to={'/owner/' + notification.message[0].petOwnerId}><strong>{notification.message[0].petOwnerName} </strong></Link> sent you a dating invitation. Please reply the invitation.<p/>
                            {notification.timeStamp}
                          </div>
            break;
          case "subscribed":
            content = <div className='media-body'>
                            <strong>{notification.sender}</strong> said:<br/>
                            <Link to={'/tipster/' + notification.message[0].subscriptionTipsterId}><strong>{notification.message[0].subscriberName}</strong></Link> subscribed you. The subscription will expired on <strong>{notification.message[0].expiryDate}</strong> <br/>
                            Subscription fee: <strong>{notification.message[0].subscriptionFee}</strong> coins received.<p/>
                            {notification.timeStamp}
                          </div>
            break;
          case "unfollow":
            content = <div className='media-body'>
                            <strong>{notification.sender}</strong> said:<br/>
                            You have unfollowed <Link to={'/pet/' + notification.message[0].unfollowPetId}><strong>{notification.message[0].unfollowPetName}</strong></Link> successfully.<p/>
                            {notification.timeStamp}
                          </div>
            break;
          case "follow":
            content = <div className='media-body'>
                            <strong>{notification.sender}</strong> said:<br/>
                            You have followed <Link to={'/pet/' + notification.message[0].followPetId}><strong>{notification.message[0].followPetName}</strong></Link> successfully.<p/>
                            {notification.timeStamp}
                          </div>
            break;
        }
        return (
          <div key={notification.notificationId} className='list-group-item animated fadeIn'>
            <div className='media'>
              <div className='pull-right'>
                  <input type='button' className='btn btn-transparent col-xs-12' onClick={this.deleteNotification.bind(this)} id={notification.notificationId} name='notificationId' value="Delete" />
              </div>
              {content}
            </div>
          </div>
        );
      });
    } else {
      notification = <div className='alert alert-warning' role='alert'>
                      <strong>You do not have any notification yet.</strong>
                     </div>;
    }

    return (
      <div className='container'>
      <h4 className='lead'><strong>Notifications</strong></h4>
        <div className='well'>
          {notification}
        </div>
        <ReactPaginate previousLabel={"previous"}
                 nextLabel={"next"}
                 breakLabel={<a href="">...</a>}
                 breakClassName={"break-me"}
                 pageCount={this.state.pageCount}
                 marginPagesDisplayed={2}
                 pageRangeDisplayed={5}
                 onPageChange={this.handlePageClick}
                 containerClassName={"pagination"}
                 subContainerClassName={"pages pagination"}
                 activeClassName={"active"} />
      </div>
    );
  }
}

export default Notifications;
