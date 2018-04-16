const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');

const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/room.controller');
const {
  createRoom,
} = require('../../validations/room.validation');

const router = express.Router();

router.route('/')
  .get(authorize(LOGGED_USER), controller.list)
  .post(authorize(LOGGED_USER), validate(createRoom), controller.create);

module.exports = router;
