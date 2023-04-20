const postSchema = require("../models/post");
const User = require("../models/user");

module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // res.cookie("id", 34);
  // postSchema
  //   .find({})
  //   .then((posts) => {
  //     return res.render("home", {
  //       posts: posts,
  //       title: "home side",
  //     });
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });

  postSchema
    .find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .then((posts) => {
      User.find()
        .then((users) => {
          return res.render("home", {
            posts: posts,
            title: "home side",
            all_users: users,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    });
};
