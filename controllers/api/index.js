const router = require("express").Router();
const userRoutes = require("./user-route.js");
const books = require("./books-route.js");
const bookshelf = require("./bookshelf-route.js");

router.use("/user", userRoutes);
router.use("/books", books);
router.use("/bookshelf", bookshelf);

module.exports = router;
