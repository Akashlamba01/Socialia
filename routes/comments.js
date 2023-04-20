const express = require("express");
const router = express.Router();
const passport = require("passport");

const commentController = require("../controller/commentController");

router.post("/create", passport.checkAthentication, commentController.create);
router.get(
  "/destroy/:id",
  passport.checkAthentication,
  commentController.delete
);

module.exports = router;
