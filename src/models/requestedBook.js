const mongoose = require('mongoose');

const requestedBookSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
});

const RequestedBook = mongoose.model('RequestedBook', requestedBookSchema);

module.exports = RequestedBook;
