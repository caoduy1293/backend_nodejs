const httpStatus = require('http-status');
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
    const eventCreated = await (new EventBookingRoom(eventObj)).save();
    res.status(httpStatus.CREATED);
    return res.json({ eventCreated });
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
