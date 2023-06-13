const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const passport = require("passport");

router.get("/", userController.getUser);

router.get("/profile/:id", passport.checkAthentication, userController.profile);
router.post("/update/:id", passport.checkAthentication, userController.update);

router.get("/sign-up", userController.signUp);
router.get("/sign-in", userController.SignIn);

router.post("/create", userController.create);
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/users/sign-in",
  }),
  userController.createSession
);
router.get("/sign-out", userController.distroySession);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/users/sign-in",
  }),
  userController.createSession
);

module.exports = router;
