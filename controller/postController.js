const PostSchema = require("../models/post");
const CommentSchema = require("../models/comment");

module.exports.postData = function (req, res) {
  PostSchema.create({
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

module.exports.delete = function (req, res) {
  console.log(req.params.id);
  PostSchema.findById(req.params.id)
    .then((post) => {
      // console.log("userid: ", post.user == req.params.id);
      // console.log("user: ", post.user);
      // console.log("user params: ", req.params.id);

      if (post.user == req.user.id) {
        console.log("post id: ", req.params.id);

        post.deleteOne({ _id: post._id });

        CommentSchema.deleteMany({ post: req.params.id })
          .then((result) => {
            // console.log(result);
            return res.redirect("back");
          })
          .catch((e) => {
            return res.redirect("back");
          });
      } else {
        return res.redirect("back");
      }
    })
    .catch((e) => {
      console.log("error form delete side", e);
    });
};
