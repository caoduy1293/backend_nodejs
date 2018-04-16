const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 128,
    minlength: 6,
    required: true,
    index: true,
    trim: true,
  },
}, {
  timestamps: true,
});

roomSchema.statics = {
  list() {
    return this.find({})
      .sort({ createdAt: -1 })
      .exec();
  },
};

module.exports = mongoose.model('Room', roomSchema);
