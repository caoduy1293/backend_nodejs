const Joi = require('joi');

module.exports = {
  // POST /v1/rooms
  createRoom: {
    body: {
      name: Joi.string().min(6).max(128).required(),
    },
  },
};
