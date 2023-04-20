const { compile } = require("ejs");
const Comment = require("../models/comment");
const Post = require("../models/post");

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
  try {
    let post = await Post.findById(req.body.post);

    console.log("postData: ", post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      console.log("content", comment);
      await post.comments.push(comment);
      await post.save();

      return res.redirect("/");
    }

    return res.redirect("/");
  } catch (error) {
    console.log(error);
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

      await comment.deleteOne({ _id: req.params.id });

      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });

      return res.redirect("/");
    }

    return res.redirect("back");
  } catch (e) {
    console.log("err form delete comment side", e);
    return res.redirect("back");
  }
};
