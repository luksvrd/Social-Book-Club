const router = require("express").Router();
const userRoute = require("./user-route.js");
const commentRoute = require("./comment-route.js");
const bookshelfRoute = require("./bookshelf-route.js");

router.use("/user", userRoute);
router.use("/comment", commentRoute);
router.use("/bookshelf", bookshelfRoute);

module.exports = router;
