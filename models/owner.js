var mongoose = require('mongoose');

var ownerSchema = new mongoose.Schema({
  petOwnerId: { type: Number, unique: true, index: true },
  name: String,
  gender: String,
  country: String,
  iconImage: String,
  birthday: Number,
  memberSince: Number,
  status: Number  //{1: valid, -1: invalid}
}, {
    versionKey: false
});

module.exports = mongoose.model('Owner', ownerSchema);
