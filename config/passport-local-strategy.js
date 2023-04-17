const passport = require("passport");
const User = require("../models/user");

const LocalStraegy = require("passport-local").Strategy;

//authenticate using passport
passport.use(
  new LocalStraegy(
    {
      userName: "email",
    },
    function (email, password, done) {
      User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password != password) {
            console.log("invalid email/password");
            return done(null, false);
          }
        })
        .catch((err) => {
          console.log("error in finding user --> passport");
          return done(err);
        });
    }
  )
);

// serializing the user to decide which key is to kept in the cookie
LocalStraegy.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserializing the user from the key in the cookie
LocalStraegy.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      console.log("error in finding user --> passport");
      return done(err);
    });
});
