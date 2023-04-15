const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");

router.get("/profile", userController.profile);

router.get("/sign-up", userController.signUp);
router.get("/sign-in", userController.SignIn);

router.post("/create", userController.create);
router.post("/create-session", userController.createSession);
router.get("/profile/delete-session", userController.signOut);

module.exports = router;
