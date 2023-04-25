const passport = require("passport");
const User = require("../models/user.js");

const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      User.findOne({ email })
        .then((user) => {
          if (!user || user.password != password) {
            req.flash("error", "Invalid username or password!");
            return done(null, false);
          }

          return done(null, user);
        })
        .catch((error) => {
          req.flash("error", "Somting wrong!");
          return done(error);
        });
    }
  )
);

passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => {
      return done(null, user);
    })
    .catch((e) => {
      return done(e);
    });
});

//check the user is authenticated
passport.checkAthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect("/user/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }

  return next();
};

module.exports = passport;
