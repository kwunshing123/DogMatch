var mongoose = require('mongoose');

var ticketSchema = new mongoose.Schema({
  ticketId:  { type: Number, unique: true, index: true },
  petOwnerId: Number,
  email: String,
  subject: String,
  type: String,
  content: String,
  dateTime: Number,
  status: String
}, {
    versionKey: false
});

module.exports = mongoose.model('Ticket', ticketSchema);
