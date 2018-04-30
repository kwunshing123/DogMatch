var mongoose = require('mongoose');

var petSchema = new mongoose.Schema({
  petId: { type: Number, unique: true, index: true },
  petOwnerId: { type: Number, index: true },
  name: String,
  gender: String,
  type: String,
  introduction: String,
  iconImage: String,
  birthday: String,
  status: Number,  //{1: valid, -1: invalid}
  followers: [],
  followerNum: Number,
  createTime: String
}, {
    versionKey: false
});

module.exports = mongoose.model('Pet', petSchema);
