const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const EventBookingRoom = require('../models/eventBookingRoom.model');

exports.create = async (req, res, next) => {
  try {
    const eventObj = {
      name: req.body.name,
      idRoom: req.body.idRoom,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      isPermanent: req.body.isPermanent || false,
      idUser: req.user.id, // this get current user
    };
    const validRq = await EventBookingRoom.checkTimeValidEvents(eventObj);
    if (!validRq) {
      throw new APIError({
        message: 'Time booking is invalid',
        status: httpStatus.BAD_REQUEST,
      });
    } else {
      const eventCreated = await (new EventBookingRoom(eventObj)).save();
      res.status(httpStatus.CREATED);
      return res.json({ eventCreated });
    }
  } catch (error) {
    return next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const events = await EventBookingRoom.list(req.query);
    res.json(events);
  } catch (error) {
    next(error);
  }
};
exports.getEventsBooked = async (req, res, next) => {
  try {
    const events = await EventBookingRoom.getEventsBooked(req.query);
    res.json(events);
  } catch (error) {
    next(error);
  }
};
