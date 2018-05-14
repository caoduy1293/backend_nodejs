const { authorize, ADMIN, LOGGED_USER, ROLE_USER } = require('../../middlewares/auth');

const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/room.controller');
const {
  createRoom,
} = require('../../validations/room.validation');

const router = express.Router();

router.route('/')
  .get(authorize([ROLE_USER, ADMIN]), controller.list)
  .post(authorize([ROLE_USER, ADMIN]), validate(createRoom), controller.create);

module.exports = router;
