const express = require("express");

const router = express.Router();
const homeController = require("../controller/homeController");

router.get("/", homeController.home);
router.use("/user", require("./users"));
router.use("/post", require("./posts"));
router.use("/comment", require("./comments"));

module.exports = router;
