const router = require("express").Router();
const { User } = require("../../models");

// Add a route to create a new user and render the homepage
// route: /api/users
router.post("/signup", async (req, res) => {
  try {
    // Create a new user
    const dbUserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    // Save the user's id to the session and send a success message
    req.session.userId = dbUserData.id;
    req.session.loggedIn = true;
    req.session.save((err) => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else {
        // console log the user's id
        console.log(dbUserData.id);
        res
          .status(200)
          .json({ userID: dbUserData.id, message: "You are now logged in!" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// add a route to log in and save the user's id to the session
// route: /api/users/login
router.post("/login", async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    // If there is no user with the posted e-mail address, send an error message
    if (!dbUserData) {
      res.status(400).json({ message: "Incorrect email or password" });
      return;
    }
    // If there is a user with the posted e-mail address, check the password
    const validPassword = await dbUserData.checkPassword(req.body.password);
    // If the password is incorrect, send an error message
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect email or password" });
      return;
    }
    // If the password is correct, save the user's id to the session and send a success message
    req.session.userId = dbUserData.id;
    req.session.loggedIn = true;
    req.session.save((err) => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else {
        // console log the user's id
        console.log(dbUserData.id);
        res
          .status(200)
          .json({ userID: dbUserData.id, message: "You are now logged in!" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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

// route to get the id of the current user
// route: /api/user/get-id
router.get("/get-id", (req, res) => {
  if (req.session.loggedIn) {
    res.status(200).json({ userID: req.session.userId });
  } else {
    res.status(404).end();
  }
});

// route to get a user by id
// route: /api/user/:id
router.get("/:id", async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    if (!dbUserData) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
