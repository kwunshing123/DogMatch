var mongoose = require('mongoose');

var counterSchema = new mongoose.Schema({
  id: {type: String, unique: true, index: true},
  counter: { type: Number}
}, {
    versionKey: false
});

module.exports = mongoose.model('Counter', counterSchema);
