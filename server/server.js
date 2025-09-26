const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// In-memory store for demo
let books = [];

// Get all books
app.get("/api/books", (req, res) => {
  res.json(books);
});

// Add a new book
app.post("/api/books",
  body("title").isLength({ min: 1 }).trim().escape(),
  body("author").isLength({ min: 1 }).trim().escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: "Invalid input", errors: errors.array() });

    const { title, author } = req.body;
    const book = { id: Date.now().toString(), title, author };
    books.push(book);
    res.status(201).json({ message: "Book added", data: book });
  }
);

// Delete a book
app.delete("/api/books/:id", (req, res) => {
  const { id } = req.params;
  books = books.filter(b => b.id !== id);
  res.json({ message: "Book deleted", id });
});

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Not found" }));

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`Library API running on port ${PORT}`));
}