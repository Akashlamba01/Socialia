const express = require("express");
const router = express.Router();
const passport = require("passport");

const postController = require("../controller/postController");

router.post("/create", passport.checkAthentication, postController.postData);
router.get("/destroy/:id", passport.checkAthentication, postController.delete);

module.exports = router;
