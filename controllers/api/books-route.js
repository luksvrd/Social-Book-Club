const router = require("express").Router();
const { Book } = require("../../models");
// const withAuth = require("../../utils/auth");

// add route to get all books in database
// route: /api/books
router.get("/", async (req, res) => {
  try {
    const bookData = await Book.findAll();
    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// add route to save a book to the database using author, title, and isbn
// route: /api/books
router.post("/", async (req, res) => {
  try {
    const bookData = await Book.create({
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
    });
    res.status(200).json(bookData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// add route to get a book by id
// route: /api/books/:id
router.get("/:id", async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id);
    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
