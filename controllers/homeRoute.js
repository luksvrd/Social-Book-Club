const { Bookshelf, User, Books } = require("../models");
const router = require("express").Router();
// const withAuth = require("../utils/auth");

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

// Add aroute to get all the books in the database and render the homepage
router.get("/", async (req, res) => {
  try {
    const bookData = await Books.findAll();
    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// signup
router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    // if user is logged in, redirect to homepage
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

// If a user is already logged in, redirect the request to another route. If not, render the login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/profile");
    return;
  }
  // render the login page with the loginForm.handlebars file if the user is not logged in
  res.render("login");
});

// route to profile if logged in
router.get("/profile", (req, res) => {
  if (req.session.loggedIn) {
    res.render("profile");
  }
});

// route to search page
router.get("/search", (req, res) => {
  res.render("search");
});

module.exports = router;
