const express = require("express");
const router = express.Router();
const passport = require("passport");

const postController = require("../controller/postController");

router.post("/create", passport.checkAthentication, postController.postData);

module.exports = router;
