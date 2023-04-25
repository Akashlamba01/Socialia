const postSchema = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  try {
    let posts = await postSchema
      .find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    let users = await User.find({});

    return res.render("home", {
      title: "home side",
      posts: posts,
      all_users: users,
    });
  } catch (e) {
    console.log("err form home side", e);
    return;
  }

  // postSchema
  //   .find({})
  //   .populate("user")
  //   .populate({
  //     path: "comments",
  //     populate: {
  //       path: "user",
  //     },
  //   })
  //   .then((posts) => {
  //     User.find()
  //       .then((users) => {
  //         return res.render("home", {
  //           posts: posts,
  //           title: "home side",
  //           all_users: users,
  //         });
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   });
};
