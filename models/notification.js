var mongoose = require('mongoose');

var notificationSchema = new mongoose.Schema({
  notificationId: { type: Number, unique: true, index: true },
  petOwnerId: Number,
  timeStamp: String,
  message: [],
  isRead: Boolean,
  senderId: Number,
  status: Number //0: hidden, 1: availd
}, {
    versionKey: false
});

module.exports = mongoose.model('Notification', notificationSchema);
