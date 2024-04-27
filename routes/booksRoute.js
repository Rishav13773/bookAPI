const express = require("express");
const router = express.Router();
const {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getBooksByAuthor,
  getBooksByPublicationYear,
} = require("../controllers/booksController");
const { authUser } = require("../middlewares/authUser");

router.post("/createBook", authUser, createBook);
router.get("/getAllBooks", authUser, getAllBooks);
router.put("/updateBook", authUser, updateBook);
router.delete("/deleteBook", authUser, deleteBook);

router.get("/getBooksByAuthor", authUser, getBooksByAuthor);
router.get("/getBooksByPublicationYear", authUser, getBooksByPublicationYear);

module.exports = router;
