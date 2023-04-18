const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const passport = require("passport");

router.get("/profile", passport.checkAthentication, userController.profile);

router.get("/sign-up", userController.signUp);
router.get("/sign-in", userController.SignIn);

router.post("/create", userController.create);
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/user/sign-in",
  }),
  userController.createSession
);
router.get("/profile/delete-session", userController.signOut);

module.exports = router;
