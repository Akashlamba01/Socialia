const postSchema = require("../models/post");

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

    .then((posts) => {
      return res.render("home", {
        posts: posts,
        title: "home side",
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
