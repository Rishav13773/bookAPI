// controllers/bookController.js

const jwt = require("jsonwebtoken");
const Book = require("../models/Books");

// Create a new book
exports.createBook = async (req, res) => {
  try {
    const { title, author, publicationYear } = req.body;
    console.log(req.body);
    console.log(req.headers);
    const authToken = req.headers.authorization;

    // const user = jwt.verify(authToken, process.env.TOKEN_SECRET);
    // if (!user) {
    //   return res.status(400).json({ message: "Invalid account" });
    // }

    const newBook = new Book({ title, author, publicationYear });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
  try {
    const id = req.query.id;

    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
  try {
    const id = req.query.id;

    await Book.findByIdAndDelete(id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get books by author name
exports.getBooksByAuthor = async (req, res) => {
  try {
    const authorName = req.query.author;

    const books = await Book.find({ author: authorName });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get books by publication year
exports.getBooksByPublicationYear = async (req, res) => {
  try {
    const publicationYear = req.query.publicationYear;

    const books = await Book.find({ publicationYear: publicationYear });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
