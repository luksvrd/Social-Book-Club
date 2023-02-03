const router = require("express").Router();
const { User } = require("../../models");

// Add a route to create a new user
// route: /api/users
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      // this is the id of the user in the database
      req.session.id = newUser.id;
      req.session.email = newUser.email;
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    // a 500 error is a server error
    res.status(500).json(err);
  }
});

// Add a route to log in a user
// route: /api/users/login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      res
        // a 400 error is a client error. It means the user did something wrong
        .status(400)
        .json({
          message:
            "The credentials provided could not be found in our database. Please try again.",
        });
      return;
    }

    const validPassword = await user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message:
          "The credentials provided could not be found in our database. Please try again.",
      });
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.email = user.email;
      req.session.loggedIn = true;

      res.json({ user, message: "You are now logged in!" });
    });
  } catch (err) {
    res
      .status(400)
      .json(
        "The credentials provided could not be found in our database. Please try again."
      );
  }
});

// Add a route to log out a user
// route: /api/users/logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      // A 204 status code means the request was successful but there is no content to send back
      res.status(204).end();
    });
  } else {
    // a 404 error means the resource was not found. In this case, the user is not logged in
    res.status(404).end();
  }
});

module.exports = router;
