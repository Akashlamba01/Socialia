const express = require("express");

const router = express.Router();
const homeController = require("../controller/homeController");

router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/post", require("./posts"));
router.use("/comment", require("./comments"));
router.use("/likes", require("./likes"));
router.use("/friends", require("./friendship"));

module.exports = router;
