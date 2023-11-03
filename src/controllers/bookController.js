const Book = require('../models/book');

async function getAllBooks(req, res) {
  try {
    const books = await Book.find();
    return res.json(books);
  } catch (error) {
    console.error('Error getting books:', error);
    return res.status(500).json({ message: 'Error getting books' });
  }
}

async function getBookById(req, res) {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.json(book);
  } catch (error) {
    console.error('Error getting the book:', error);
    return res.status(500).json({ message: 'Error getting the book' });
  }
}

async function createBook(req, res) {
  const { title, author, publishedYear, genre, stock } = req.body;

  try {
    if (!title || !author || !publishedYear || !genre) {
      return res.status(400).json({ message: 'All fields are mandatory' });
    }
    const newBook = new Book({
      title,
      author,
      publishedYear,
      genre,
      stock
    });
    await newBook.save();
    return res.status(201).json({ message: 'Book successfully created', book: newBook });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Error' });
  }
}

async function updateBook(req, res) {
  const { id } = req.params;
  const { title, author, publishedYear, genre } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(
      id,
      { title, author, publishedYear, genre },
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.json(book);
  } catch (error) {
    console.error('Error updating the book:', error);
    return res.status(500).json({ message: 'Error updating the book' });
  }
}

async function deleteBook(req, res) {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndRemove(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.json({ message: 'Book successfully deleted' });
  } catch (error) {
    console.error('Error deleting the book:', error);
    return res.status(500).json({ message: 'Error deleting the book' });
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
