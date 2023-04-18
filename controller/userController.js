const User = require("../models/user");

// retder profile page
// module.exports.profile = function (req, res) {
//   if (req.cookies.user_id) {
//     User.findById(req.cookies.user_id)
//       .then((user) => {
//         return res.render("user_profile", {
//           title: "user profile",
//           user: user,
//         });
//       })
//       .catch((err) => {
//         console.log(err, "err form profile side");
//       });
//   } else {
//     return res.render("user_sign_in", {
//       title: "user sign in",
//     });
//   }
// };

module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "User Profile",
  });
};

// retder sign in page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }

  return res.render("user_sign_up", {
    title: "user sign up",
  });
};

// retder sign in page
module.exports.SignIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }

  return res.render("user_sign_in", {
    title: "user sign in",
  });
};

//get  the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.c_password) {
    console.log("password and confirm password dose not match");
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        User.create(req.body)
          .then((data) => {
            console.log("data", data);
            return res.redirect("/user/sign-in");
          })
          .catch((err) => {
            console.log("err form creating side in sign up", err);
            return;
          });
      } else {
        console.log("this email aleady exists: ", user);
        return res.redirect("back");
      }
    })
    .catch((err) => {
      console.log("err form finding side in sign up", err);
      return;
    });
};

//sign in and create seetion for user
// module.exports.createSession = function (req, res) {
//   //todo later
//   //step
//   //find the user
//   User.findOne({ email: req.body.email })
//     .then((user) => {
//       //handel password match
//       if (user.password != req.body.password) {
//         console.log("invalid details");
//         return res.redirect("back");
//       }

//       //handel session
//       res.cookie("user_id", user.id);
//       return res.redirect("/user/profile");
//     })
//     .catch((err) => {
//       console.log(err, "somthing wrong");
//       return res.redirect("back");
//     });

//   //check password
// };

module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

module.exports.signOut = function (req, res) {
  // req.logout();
  return res.redirect("/");
};
