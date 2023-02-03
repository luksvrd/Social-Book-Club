const router = require("express").Router();
const { Book } = require("../../models");
const withAuth = require("../../utils/auth");

// Add a route to search for books by title and add them to the database
// route: /api/books/search
router.post("/search", withAuth, async (req, res) => {
  try {
    const bookData = await Book.create({
      // Adding a book to the database requires the book's title, author, isbn, and cover
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      cover: req.body.cover,
    });
    res.status(200).json(bookData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Add route to select a book from the database and add it to the user's bookshelf
// route: /api/books/add
router.post("/add", withAuth, async (req, res) => {
  try {
    const bookData = await Book.create({
      // Adding a book to the user's bookshelf requires the user's id as well as the book's id
      book_id: req.body.book_id,
      user_id: req.session.user_id,
    });
    res.status(200).json(bookData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Add route to remove a book from the user's bookshelf
// route: /api/books/remove
router.delete("/remove", withAuth, async (req, res) => {
  try {
    const bookData = await Book.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json(bookData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
