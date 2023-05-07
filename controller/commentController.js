const { compile } = require("ejs");
const Comment = require("../models/comment");
const Post = require("../models/post");
const Like = require("../models/like");
const commentMailer = require("../mailres/comments");

// create comment
// module.exports.create = function (req, res) {
//   console.log(req.body.post);
//   console.log("comment value: ", req.body.content);
//   // return res.redirect("/");
//   Post.findById(req.body.post)
//     .then((post) => {
//       console.log("postData: ", post);
//       if (post) {
//         Comment.create({
//           content: req.body.content,
//           post: req.body.post,
//           user: req.user._id,
//         })
//           .then((comment) => {
//             console.log("content", comment);
//             post.comments.push(comment);
//             post.save();

//             return res.redirect("/");
//           })
//           .catch((err) => {
//             console.log(err, "err from comment side");
//           });
//       }
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// };

//create comment using async await
module.exports.create = async function (req, res) {
  console.log("bahi kuch too aja");
  try {
    let post = await Post.findById(req.body.post);

    console.log("postData: ", post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      // console.log("content", comment);
      await post.comments.push(comment);
      await post.save();

      comment = await comment.populate("user", "name email");

      await commentMailer.newComment(comment);

      req.flash("success", "commetn added!");
      return res.redirect("/");
    }

    return res.redirect("/");
  } catch (e) {
    req.flash("error", e);
    return res.redirect("/");
  }
};

//delte comment
module.exports.delete = async function (req, res) {
  // console.log(req.params.id)

  try {
    // console.log("req.param.id: ", req.user.id);

    let comment = await Comment.findById(req.params.id);
    console.log("comment.user", comment);

    if (comment.user == req.user.id) {
      let postId = comment.post;

      await Like.deleteMany({ likeable: comment, onModel: "Comment" });

      await Comment.deleteOne({ _id: req.params.id });

      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });

      req.flash("error", "commetn deleted!");

      return res.redirect("/");
    }

    return res.redirect("back");
  } catch (e) {
    req.flash("error", e);
    return res.redirect("back");
  }
};
