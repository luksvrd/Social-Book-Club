const router = require("express").Router();
const userRoutes = require("./user-route.js");
const commentRoutes = require("./comment-route.js");
const bookshelfRoutes = require("./bookshelf-route.js");

router.use("/users", userRoutes);
router.use("/comments", commentRoutes);
router.use("/bookshelves", bookshelfRoutes);

module.exports = router;
