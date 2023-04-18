const postSchema = require("../models/post");

module.exports.postData = function (req, res) {
  postSchema
    .create({
      content: req.body.content,
      user: req.user._id,
    })
    .then((post) => {
      console.log(post);
      res.redirect("/");
    })
    .catch((e) => {
      console.log("err from the creating post side", e);
    });
};
