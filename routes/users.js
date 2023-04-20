const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const passport = require("passport");

router.get("/profile/:id", passport.checkAthentication, userController.profile);
router.post("/update/:id", passport.checkAthentication, userController.update);

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
router.get("/sign-out", userController.distroySession);

module.exports = router;
