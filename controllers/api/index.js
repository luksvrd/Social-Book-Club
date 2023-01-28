const router = require("express").Router();
const userRoutes = require("./user-routes");
const commentRoutes = require("./comment-routes");
const bookshelfRoutes = require("./bookshelf-routes");

router.use("/users", userRoutes);
router.use("/comments", commentRoutes);
router.use("/bookshelves", bookshelfRoutes);

module.exports = router;

