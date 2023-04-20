const { compile } = require("ejs");
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

module.exports.delete = function (req, res) {
  // console.log(req.params.id)
  console.log("req.param.id: ", req.user.id);
  Comment.findById(req.params.id)
    .then((comment) => {
      console.log("comment.user", comment);
      if (comment.user == req.user.id) {
        let postId = comment.post;

        comment.deleteOne({ _id: req.params.id });

        Post.findByIdAndUpdate(postId, {
          $pull: { comments: req.params.id },
        })
          .then(() => {
            return res.redirect("back");
          })
          .catch((e) => {
            console.log("err form delete comment side", e);
            return res.redirect("back");
          });
      } else {
        return res.redirect("back");
      }
    })
    .catch((e) => {
      console.log("err form delete comment side", e);
      return res.redirect("back");
    });
};
