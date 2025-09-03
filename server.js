const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const bookingRoutes = require('./routes/bookings');
require("dotenv").config();

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://root:root@learncoding.ahuqxik.mongodb.net/movieBooking?retryWrites=true&w=majority&appName=LearnCoding');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
connectDB();


app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, 'views')));


app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/bookings', bookingRoutes);


app.listen(4200, () => console.log('Server running on port 4200'));