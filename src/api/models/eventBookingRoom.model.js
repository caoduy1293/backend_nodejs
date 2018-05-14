const mongoose = require('mongoose');
const moment = require('moment');
const lodash = require('lodash');
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
eventBookingRoomSchema.pre('save', async function save(next) {
  this.startDate = moment(this.startDate);
  this.endDate = moment(this.endDate);
  return next();
});

eventBookingRoomSchema.statics = {
  async checkTimeValidEvents(eventBooking) {
    const startDateTime = moment(eventBooking.startDate);
    startDateTime.second(0);
    startDateTime.millisecond(0);
    const endDateTime = moment(eventBooking.endDate);
    endDateTime.second(0);
    endDateTime.millisecond(0);
    let validRequest = true;
    if (startDateTime.format('YYYY MM DD') === endDateTime.format('YYYY MM DD')
      && startDateTime.isBefore(endDateTime)
      && startDateTime.isAfter(moment())) {
      const thisDateTemp = lodash.cloneDeep(startDateTime);
      thisDateTemp.hour(0);
      thisDateTemp.minute(0);
      thisDateTemp.second(0);
      const tomorrowTemp = lodash.cloneDeep(startDateTime);
      tomorrowTemp.add(1, 'days');
      tomorrowTemp.hour(0);
      tomorrowTemp.minute(0);
      tomorrowTemp.second(0);
      const eventsOnThisDay = await this.find({
        startDate: {
          $gte: thisDateTemp,
          $lt: tomorrowTemp,
        },
      }).exec();
      for (let i = 0, eventItem; i < eventsOnThisDay.length; i++) {
        eventItem = eventsOnThisDay[i];
        const startEventItem = moment(eventItem.startDate);
        startEventItem.second(0);
        startEventItem.millisecond(0);
        const endEventItem = moment(eventItem.endDate);
        endEventItem.second(0);
        endEventItem.millisecond(0);
        if (startEventItem.isBefore(endDateTime) && startDateTime.isBefore(endEventItem)) {
          validRequest = false;
          break;
        }
      }
    } else {
      validRequest = false;
    }
    console.log('validRequest', validRequest);
    return validRequest;
  },
  list({ idRoom }) {
    const options = omitBy({ idRoom }, isNil);
    return this.find(options)
      .sort({ createdAt: -1 })
      .exec();
  },
  getEventsBooked(request) {
    const selectedDate = moment(request.selectedDate);
    selectedDate.hour(0);
    selectedDate.minute(0);
    selectedDate.second(0);
    const tomorrow = moment(request.selectedDate);
    tomorrow.add(1, 'days');
    tomorrow.hour(0);
    tomorrow.minute(0);
    tomorrow.second(0);
    return this.find({
      idRoom: request.idRoom,
      startDate: {
        $gte: selectedDate,
        $lt: tomorrow,
      },
    }).sort({ startDate: -1 }).exec();
  },
};

module.exports = mongoose.model('Event_Booking_Room', eventBookingRoomSchema);
