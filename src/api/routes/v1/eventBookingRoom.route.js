const { authorize, ADMIN, LOGGED_USER, ROLE_USER } = require('../../middlewares/auth');

const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/eventBookingRoom.controller');
const {
  createEvents,
  getEvents,
  getEventsBooked,
} = require('../../validations/eventBookingRoom.validation');

const router = express.Router();

router.route('/')
  .get(authorize([ROLE_USER, ADMIN]), validate(getEvents), controller.list)
  .post(authorize([ROLE_USER, ADMIN]), validate(createEvents), controller.create);
router.route('/eventsBooked')
  .get(authorize([ROLE_USER, ADMIN]), validate(getEventsBooked), controller.getEventsBooked);

module.exports = router;
