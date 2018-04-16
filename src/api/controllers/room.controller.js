const httpStatus = require('http-status');
const RoomModel = require('../models/room.model');

exports.create = async (req, res, next) => {
  try {
    const roomCreated = await (new RoomModel(req.body)).save();
    res.status(httpStatus.CREATED);
    return res.json({ roomCreated });
  } catch (error) {
    return next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const rooms = await RoomModel.list();
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};
