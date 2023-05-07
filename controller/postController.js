const PostSchema = require("../models/post");
const CommentSchema = require("../models/comment");
const likeSchem = require("../models/like");

//post for user
module.exports.postData = async function (req, res) {
  try {
    let post = await PostSchema.create({
      content: req.body.content,
      user: req.user._id,
    });

    // if (req.xhr) {
    //   return res.status(200).json({
    //     data: {
    //       post: post,
    //     },
    //     message: "post success!",
    //   });
    // }

    req.flash("success", "post uploaded successfuly!");
    console.log(post);
    return res.redirect("/");
  } catch (e) {
    req.flash("error", e);
    return res.redirect("/");
  }
};

// post delete for user
// module.exports.delete = function (req, res) {
//   console.log(req.params.id);
//   PostSchema.findById(req.params.id)
//     .then((post) => {
//       // console.log("userid: ", post.user == req.params.id);
//       // console.log("user: ", post.user);
//       // console.log("user params: ", req.params.id);

//       if (post.user == req.user.id) {
//         console.log("post id: ", req.params.id);

//         post.deleteOne({ _id: post._id });

//         CommentSchema.deleteMany({ post: req.params.id })
//           .then((result) => {
//             // console.log(result);
//             return res.redirect("back");
//           })
//           .catch((e) => {
//             return res.redirect("back");
//           });
//       } else {
//         return res.redirect("back");
//       }
//     })
//     .catch((e) => {
//       console.log("error form delete side", e);
//     });
// };

module.exports.delete = async function (req, res) {
  try {
    console.log(req.params.id);
    let post = await PostSchema.findById(req.params.id);

    if (post.user == req.user.id) {
      console.log("post id: ", req.params.id);
      await post.deleteOne({ _id: post._id });

      await likeSchem.deleteMany({ likeable: post, onModel: "Post" });
      await likeSchem.deleteMany({ _id: { $in: post.comments } });

      let result = await CommentSchema.deleteMany({ post: req.params.id });
      console.log(result);

      // let post = post.remove();
      let deletePost = await PostSchema.findOneAndDelete({ _id: post.id });
      console.log(deletePost);

      req.flash("success", "post deleted!");
      return res.redirect("back");
    }
    return res.redirect("back");
  } catch (e) {
    req.flash("error", e);
    return res.redirect("/");
  }
};
