const router = require("express").Router();
const userRoutes = require("./user-route");
const commentRoutes = require("./comment-route");
const bookshelfRoutes = require("./bookshelf-route");

router.use("/users", userRoutes);
router.use("/comments", commentRoutes);
router.use("/bookshelves", bookshelfRoutes);

module.exports = router;

