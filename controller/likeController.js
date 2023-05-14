const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");

exports.likeToggle = async (req, res) => {
  try {
    let likeable;
    let deleteLike = false;

    if (req.query.type == "Post") {
      likeable = await Post.findById(req.query.id).populate("likes");
    } else {
      likeable = await Comment.findById(req.query.id).populate("likes");
    }

    // console.log(likeable);

    let isLike = await Like.findOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.user._id,
    });

    // console.log("isLike: ", isLike);
    // console.log("userId: ", req.user.id);
    // console.log("likeable: ", req.query.id);
    // console.log("onModel: ", req.query.type);

    if (isLike) {
      likeable.likes.pull(isLike._id);
      likeable.save();

      isLike.deleteOne();
      deleteLike = true;
    } else {
      let newLike = await Like.create({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type,
      });
      // console.log("likeId: ", newLike._id);
      likeable.likes.push(newLike.id);
      likeable.save();
    }

    return res.redirect("back");
  } catch (e) {
    return res.status(500).json({
      message: "internal server err",
    });
  }
};
