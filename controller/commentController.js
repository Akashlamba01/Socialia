const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
  console.log(req.body.post);
  console.log("comment value: ", req.body.content);
  // return res.redirect("/");
  Post.findById(req.body.post)
    .then((post) => {
      console.log("postData: ", post);
      if (post) {
        Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        })
          .then((comment) => {
            console.log("content", comment);
            post.comments.push(comment);
            post.save();

            return res.redirect("/");
          })
          .catch((err) => {
            console.log(err, "err from comment side");
          });
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
