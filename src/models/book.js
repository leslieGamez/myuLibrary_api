const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedYear: Number,
  genre: String,
  stock: Number
});

module.exports = mongoose.model('Book', bookSchema);
