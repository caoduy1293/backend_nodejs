const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');

const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/eventBookingRoom.controller');
const {
  createEvents,
  getEvents,
} = require('../../validations/eventBookingRoom.validation');

const router = express.Router();

router.route('/')
  .get(authorize(LOGGED_USER), validate(getEvents), controller.list)
  .post(authorize(LOGGED_USER), validate(createEvents), controller.create);

module.exports = router;
