const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const runTask = require("npm-run-all/lib/run-task");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "178231003366-plfd51oimp94kf62i9fevdhtre48ei4p.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },

    async function (accessToken, refreshToken, profile, cb) {
      await User.findOne({ email: profile.emails[0].value })
        .then((user) => {
          console.log(user, " useirjkejkjkjlkjlkjl");
          if (!user) {
            let newUser = User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(8).toString("hex"),
            });
            return cb(null, newUser);
          }
          return cb(null, user);
        })
        .catch((err) => {
          console.log("erro from google strategy: ", err);
          return;
        });
    }
  )
);

module.exports = passport;
