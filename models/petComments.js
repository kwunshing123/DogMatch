let mongoose = require('mongoose');

let petCommentsSchema = new mongoose.Schema({
  commentId: { type: Number, unique: true, index: true },
  petId: { type: Number, index: true },
  petOwnerId: { type: Number, index: true },
  petOwnerName: String,
  comment: String,
  time: String
}, {
    versionKey: false
});

module.exports = mongoose.model('PetComments', petCommentsSchema);
