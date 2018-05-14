const error = require('../../middlewares/error');

const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const roomRoutes = require('./room.route');
const eventBookingRoomRoutes = require('./eventBookingRoom.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/rooms', roomRoutes);
router.use('/events', eventBookingRoomRoutes);

// if error is not an instanceOf APIError, convert it.
router.use(error.converter);

// catch 404 and forward to error handler
router.use(error.notFound);

// error handler, send stacktrace only during development
router.use(error.handler);

module.exports = router;
