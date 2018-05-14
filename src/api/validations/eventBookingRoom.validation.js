const Joi = require('joi');

module.exports = {
  // GET /v1/events/eventsBooked
  getEventsBooked: {
    query: {
      idRoom: Joi.string().required(),
      selectedDate: Joi.date().required(),
    },
  },
  // GET /v1/events
  getEvents: {
    query: {
      idRoom: Joi.string().required(),
    },
  },
  // POST /v1/events
  createEvents: {
    body: {
      name: Joi.string().min(6).max(128).required(),
      idRoom: Joi.string().required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      isPermanent: Joi.boolean(),
    },
  },
};
