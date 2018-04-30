var mongoose = require('mongoose');

var datingSchema = new mongoose.Schema({
  datingId: Number,
  targetPetId: Number,
  targetPetOwnerId: Number,
  name: String,
  type: String,
  address: String,
  date: String,
  start: String,
  end: String,
  message: String,
  petOwnerId: Number,
  petOwnerName: String,
  petId: Number,
  status: Number  //{1: waiting for response, 2: accepted, 3: rejected}
}, {
    versionKey: false
});

module.exports = mongoose.model('Dating', datingSchema);
