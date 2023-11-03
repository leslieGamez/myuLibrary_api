const express = require('express');
const router = express.Router();
const RequestedBookController = require('../controllers/requestedBookController');

router.get('/requested-books', RequestedBookController.getAllRequestedBooks);
router.get('/requested-books/:id', RequestedBookController.getRequestedBookById);
router.get('/requested-user-books', RequestedBookController.getRequestedBooks);
router.post('/requested-books', RequestedBookController.createRequestedBook);
router.put('/requested-books/:id', RequestedBookController.updateRequestedBook);
router.delete('/requested-books/:id', RequestedBookController.deleteRequestedBook);

module.exports = router;
