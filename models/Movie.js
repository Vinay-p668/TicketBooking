const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  showtime: { type: String, required: true },
  price: { type: Number, required: true },
  bookedSeats: { type: [String], default: [] },
  availableTickets: { type: Number, required: true },
});

module.exports = mongoose.model('Movie', movieSchema);