const express = require('express');
const movieController = require('../controllers/movieController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovieById);
router.post('/', authMiddleware('admin'), movieController.addMovie);
router.put('/:id', authMiddleware('admin'), movieController.updateMovie);
router.delete('/:id', authMiddleware('admin'), movieController.deleteMovie);

module.exports = router;