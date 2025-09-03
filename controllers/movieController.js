const Movie = require('../models/Movie');

exports.getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

exports.addMovie = async (req, res) => {
  const { title, showtime, price, totalTickets } = req.body;
  const movie = new Movie({
    title,
    showtime,
    price,
    totalTickets,
    availableTickets: totalTickets,
    bookedSeats: []
  });
  await movie.save();
  res.status(201).json(movie);
};

exports.updateMovie = async (req, res) => {
  const { title, showtime, price, totalTickets } = req.body;
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    { title, showtime, price, totalTickets, availableTickets: totalTickets },
    { new: true }
  );
  res.json(movie);
};

exports.deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: 'Movie deleted' });
};

exports.getMovieById = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).json({ message: 'Movie not found' });
  res.json(movie);
};