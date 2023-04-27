const User = require("../models/user");
const path = require("path");
const fs = require("fs");

// module.exports.home = function (req, res) {
//   Todo.find({}).then((todo) => {
//     return res
//       .render("home", {
//         title: "Todo app",
//         to_do: todo,
//       })
//       .catch((e) => {
//         console.log(e);
//         return res.redirect("/");
//       });
//   });
// };

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

//profile of user
module.exports.profile = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.redirect("back");
    }
    return res.render("user_profile", {
      title: "User Profile",
      profile_user: user,
    });
  } catch (e) {
    console.log(e);
    return res.redirect("back");
  }
};

// render sign in page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }

  return res.render("user_sign_up", {
    title: "user sign up",
  });
};

// render sign in page
module.exports.SignIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/profile");
  }

  return res.render("user_sign_in", {
    title: "user sign in",
  });
};

//get the sign up data
// module.exports.create = function (req, res) {
//   if (req.body.password != req.body.c_password) {
//     console.log("password and confirm password dose not match");
//     return res.redirect("back");
//   }

//   User.findOne({ email: req.body.email })
//     .then((user) => {
//       if (!user) {
//         User.create(req.body)
//           .then((data) => {
//             console.log("data", data);
//             return res.redirect("/user/sign-in");
//           })
//           .catch((err) => {
//             console.log("err form creating side in sign up", err);
//             return;
//           });
//       } else {
//         console.log("this email aleady exists: ", user);
//         return res.redirect("back");
//       }
//     })
//     .catch((err) => {
//       console.log("err form finding side in sign up", err);
//       return;
//     });
// };

//get the sign up data using async await
module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.c_password) {
      console.log("password and confirm password dose not match");
      return res.redirect("back");
    }

    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      let userData = await User.create(req.body);
      console.log("data", userData);
      return res.redirect("/user/sign-in");
    }

    console.log("this email aleady exists: ", user);
    return res.redirect("back");
  } catch (err) {
    console.log("err form finding side in sign up", err);
    return;
  }
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
  req.flash("success", "loged in successfuly!");
  return res.redirect("/");
};

module.exports.distroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    req.flash("success", "loged out successfuly!");

    return res.redirect("/");
  });
};

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);

      // console.log(user);
      User.uploadAvatar(req, res, async function (err) {
        if (err) {
          console.log(err);
        }

        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          if (user.avatar) {
            let avatarPrePath = path.join(__dirname, "..", user.avatar);
            await fs.unlink(avatarPrePath, (err) => {
              if (err) throw err;
              console.log("filepath: ", avatarPrePath);
            });
          }

          user.avatar = User.avatarPath + "/" + req.file.filename;
        }

        user.save();
        // console.log(req.file);
      });

      // console.log("updated: ", user);
      req.flash("success", "User Updated!");
      return res.redirect("/");
    } catch (e) {
      console.log(e);
      return res.redirect("back");
    }
  }

  req.flash("error", "Unautorized!");
  return res.status(401).send("Unautorized");
};
