const router = require("express").Router();
const { User } = require("../../models");

// Add a route to create a new user and render the homepage
// route: /api/users
router.post("/signup", async (req, res) => {
  try {
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Add a route to log in a user
// route: /api/users/login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({ where: { email: req.body.email } });

    if (!dbUserData) {
      res
        // a 400 error is a client error. It means the user did something wrong
        .status(400)
        .json({
          message:
            "The credentials provided could not be found in our database. Please try again.",
        });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message:
          "The credentials provided could not be found in our database. Please try again.",
      });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    // .json({ message: "There was an error logging in. Please try again." });
  }
});

// After The user logs in or signs up, they will be redirected to the homepage. The homepage will display the user's name and a logout button. The logout button will be a form that will send a POST request to the logout route. The logout route will destroy the session and redirect the user to the homepage.

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

// Add route to render the user's profile page if they are logged in

module.exports = router;
