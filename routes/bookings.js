const express = require('express');
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware('user'), bookingController.createBooking);
router.post('/confirm/:id', authMiddleware('user'), bookingController.confirmBooking);
router.get('/user', authMiddleware('user'), bookingController.getUserBookings);

module.exports = router;