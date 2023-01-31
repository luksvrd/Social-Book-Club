const { Bookshelf, User, Comment } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const bookshelfData = await Bookshelf.findAll({
      include: [
        {
          // model is the name of the model we're including in the query.
          model: User,
          // attributes is an array of the attributes we want to include in the query.
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

// router.get("/list/:id", async (req, res) => {
//   try {
//     const listData = await list.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ["name"],
//         },
//       ],
//     });

//     if (listData) {
//       const list = listData.get({ plain: true });

//       res.render("list", { list });
//     } else {
//       res.status(404).end();
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findAll({
      where: {
        user_id: req.session.user_id,
        attributes: { exclude: ["password"] },
        include: [{ model: Bookshelf }],
      },
    });

    if (userData) {
      const user = userData.get({ plain: true });

      res.render("profile", {
        ...user,
        logged_in: true,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// signup
router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
