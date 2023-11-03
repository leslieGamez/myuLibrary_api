const RequestedBook = require('../models/requestedBook');
const Book = require('../models/book');

async function getAllRequestedBooks(req, res) {
  try {
    const requestedBooks = await RequestedBook.find();
    return res.json(requestedBooks);
  } catch (error) {
    console.error('Error getting requested books:', error);
    return res.status(500).json({ message: 'Error getting requested books' });
  }
}

async function getRequestedBookById(req, res) {
  const { id } = req.params;
  try {
    const requestedBook = await RequestedBook.findById(id);
    if (!requestedBook) {
      return res.status(404).json({ message: 'Requested book not found' });
    }
    return res.json(requestedBook);
  } catch (error) {
    console.error('Error getting the requested book:', error);
    return res.status(500).json({ message: 'Error getting the requested book' });
  }
}

async function getRequestedBooks(req, res) {
  try {
    const requestedBooks = await RequestedBook.find()
      .populate('userId', 'firstName lastName')
      .populate('bookId', 'title');

    res.json(requestedBooks);
  } catch (error) {
    console.error('Error getting requested books:', error);
    res.status(500).json({ message: 'Error getting requested books' });
  }
}

async function createRequestedBook(req, res) {
  const { userId, bookId } = req.body;

  try {
    if (!userId || !bookId) {
      return res.status(400).json({ message: 'userId and bookId fields are mandatory' });
    }

    const newRequestedBook = new RequestedBook({
      userId,
      bookId,
    });

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    book.stock -= 1;
    await book.save();
    await newRequestedBook.save();

    return res.status(201).json({ message: 'Requested book created successfully', requestedBook: newRequestedBook });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Error' });
  }
}

async function updateRequestedBook(req, res) {
  const { id } = req.params;
  const { userId, bookId } = req.body;
  try {
    const requestedBook = await RequestedBook.findByIdAndUpdate(
      id,
      { userId, bookId },
      { new: true }
    );
    if (!requestedBook) {
      return res.status(404).json({ message: 'Requested book not found' });
    }
    return res.json(requestedBook);
  } catch (error) {
    console.error('Error updating the requested book:', error);
    return res.status(500).json({ message: 'Error updating the requested book' });
  }
}

async function deleteRequestedBook(req, res) {
  const { id } = req.params;
  try {
    const requestedBook = await RequestedBook.findByIdAndRemove(id);
    if (!requestedBook) {
      return res.status(404).json({ message: 'Requested book not found' });
    }
    return res.json({ message: 'Requested book deleted successfully' });
  } catch (error) {
    console.error('Error deleting the requested book:', error);
    return res.status(500).json({ message: 'Error deleting the requested book' });
  }
}

module.exports = {
  getAllRequestedBooks,
  getRequestedBookById,
  createRequestedBook,
  updateRequestedBook,
  deleteRequestedBook,
  getRequestedBooks
};
