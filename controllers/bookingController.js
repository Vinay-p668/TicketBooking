const Movie = require('../models/Movie');
const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  const { movieId, seat } = req.body;
  try {
    
    const movie = await Movie.findOneAndUpdate(
      { _id: movieId, bookedSeats: { $ne: seat }, availableTickets: { $gt: 0 } },
      { $push: { bookedSeats: seat }, $inc: { availableTickets: -1 } },
      { new: true }
    );

    if (!movie) {
      return res.status(400).json({ message: 'Seat unavailable or movie not found' });
    }

    const booking = new Booking({
      userId: req.user.id,
      movieId,
      seat
    });
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking || booking.userId.toString() !== req.user.id) {
      return res.status(400).json({ message: 'Invalid booking' });
    }
    booking.status = 'confirmed';
    await booking.save();
    res.json({ message: 'Booking confirmed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('movieId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};