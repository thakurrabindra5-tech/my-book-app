const express = require('express');
const cors = require('cors');

const connectDB = require('./Mongodbconnect.js');
const Book = require('./booksSchema');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Default route
app.get('/', (req, res) => {
  res.send('Online Library Backend Running');
});


// ==========================
// REST API ROUTES
// ==========================

// 1️⃣ Get all books
app.get('/allbooks', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// 2️⃣ Get book by ID
app.get('/getbook/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});

// 3️⃣ Add new book
app.post('/addbooks', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(200).json({ message: 'Book added successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4️⃣ Update book
app.post('/updatebook/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({
      message: 'Book updated successfully',
      book: updatedBook
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5️⃣ Delete book
app.post('/deleteBook/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.send('Book deleted successfully');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// START SERVER
// ==========================
(async () => {
  await connectDB();
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
})();
