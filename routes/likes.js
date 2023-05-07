const express = require("express");
const router = express.Router();

const likeController = require("../controller/likeController");

router.get("/toggle", likeController.likeToggle);

module.exports = router;
