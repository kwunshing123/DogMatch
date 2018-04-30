let mongoose = require('mongoose');

let partySchema = new mongoose.Schema({
  partyId: { type: Number, index: true, unique: true},
  name: String,
  date: String,
  start: String,
  end: String,
  address: String,
  fee: String,
  condition: {
    age: String,
    numberOfParticipants: Number
  },
  attendant: [],
  organizer: String,
  petOwnerId: Number,
  remarks: [],
  status: Number  //{1: valid, 0: full, -1: expired}
}, {
    versionKey: false
});

module.exports = mongoose.model('Party', partySchema);
