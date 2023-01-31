const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoute");

router.use("/", homeRoute);
router.use("/api", apiRoute);

module.exports = router;
