const mongoose = require('mongoose');
const { omitBy, isNil } = require('lodash');

const eventBookingRoomSchema = new mongoose.Schema({
  idRoom: {
    type: String,
    required: true,
  },
  idUser: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isPermanent: {
    type: Boolean,
    default: false,
  },
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

eventBookingRoomSchema.statics = {
  list({ idRoom }) {
    const options = omitBy({ idRoom }, isNil);
    return this.find(options)
      .sort({ createdAt: -1 })
      .exec();
  },
};

module.exports = mongoose.model('Event_Booking_Room', eventBookingRoomSchema);
