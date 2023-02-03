const { Bookshelf, User, Comment, Books } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

// Get all bookshelves for homepage
router.get("/", async (req, res) => {
  console.log("hello");
  try {
    // Get all projects and JOIN with user data
    const bookshelfData = await Bookshelf.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const bookshelf = bookshelfData.map((bookshelf) =>
      bookshelf.get({ plain: true })
    );

    // Pass serialized data and session flag into template
    res.render("homepage", {
      bookshelf,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a route to get a single bookshelf
router.get("/bookshelf/:id", async (req, res) => {
  try {
    const bookshelfData = await Bookshelf.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Books,
          attributes: ["title", "author", "isbn", "pages", "cover"],
        },
      ],
    });

    const bookshelf = bookshelfData.get({ plain: true });

    res.render("bookshelf", {
      ...bookshelf,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a route to get a single book
router.get("/book/:id", async (req, res) => {
  try {
    const bookData = await Books.findByPk(req.params.id, {
      include: [
        {
          model: Bookshelf,
          attributes: ["title"],
        },
        {
          model: Comment,
          attributes: ["comment_text", "user_id", "book_id"],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
      ],
    });

    const book = bookData.get({ plain: true });

    res.render("book", {
      ...book,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a route to get a single comment and render the edit-comment page
router.get("/comment/:id", async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: Books,
          attributes: ["title"],
        },
        { model: User, attributes: ["name"] },
      ],
    });

    const comment = commentData.get({ plain: true });

    res.render("edit-comment", {
      ...comment,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a route to get a single user and render the profile page with their bookshelves and books
router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Bookshelf,
          attributes: ["title"],
          include: {
            model: Books,
            attributes: ["title", "author", "isbn", "pages", "cover"],
          },
        },
      ],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// If a user is already logged in, redirect the request to another route. If not, render the login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
