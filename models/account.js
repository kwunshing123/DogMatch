var mongoose = require('mongoose');

var accountSchema = new mongoose.Schema({
  email: String,
  password: String,
  petOwnerId: Number,
  status: Number,  //{0: waiting for activate, 1: valid, -1: invalid}
  salt: String,
  activateCode: String,
  forgotPassword: String,
  name: String
}, {
    versionKey: false
});

module.exports = mongoose.model('Account', accountSchema);
