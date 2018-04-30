import alt from '../alt';

class NotificationActions {
  constructor() {
    this.generateActions(
      'getNotificationsSuccess',
      'getNotificationsFail',
      'deleteNotificationSuccess',
      'deleteNotificationFail'
    );
  }

  getNotifications(offset, qty) {
    $.ajax({ url: '/api/owner/notifications/' + offset + '/' + qty})
    .done((data) => {
      this.actions.getNotificationsSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getNotificationsFail(jqXhr);
    });
  }

  deleteNotification(notificationId) {
    $.ajax({
      type: 'POST',
      url: '/api/notifications/delete/',
      data: {notificationId: notificationId}
    })
    .done((data) => {
      this.actions.deleteNotificationSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.deleteNotificationFail(jqXhr.responseJSON.message);
    });
  }

}

export default alt.createActions(NotificationActions);
