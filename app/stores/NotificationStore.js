import alt from '../alt';
import NotificationActions from '../actions/NotificationActions';
import NavbarActions from '../actions/NavbarActions';

class NotificationStore {
  constructor() {
    this.bindActions(NotificationActions);
    this.notifications = [];
    this.offset = 0;
    this.pageCount = 0;
  }

  onGetNotificationsSuccess(data) {
    this.setState({ notifications: data.notifications, pageCount: Math.ceil(data.total / 10)});
    NavbarActions.authenticate();
    NavbarActions.getUnreadNotification();
  }

  onGetNotificationsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onDeleteNotificationSuccess(data) {
    toastr.success(data.message);
    NotificationActions.getNotifications(0, 10);
  }

  onDeleteNotificationFail(jqXhr) {
    toastr.error(jqXhr);
  }

}

export default alt.createStore(NotificationStore);
