const express = require("express");
const router = express.Router();

const friendController = require("../controller/friendController");

router.get("/toggle", friendController.addFriend);

module.exports = router;
