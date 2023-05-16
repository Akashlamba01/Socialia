const User = require("../models/user");
const Friendship = require("../models/friendship");

module.exports.addFriend = async (req, res) => {
  try {
    // let friend = false;
    let user = await User.findById(req.user._id);

    let isFriend = await Friendship.findOne({ to_user: req.query.id });

    if (isFriend) {
      isFriend.deleteOne();
      console.log(req.query.id);
      user.friends.pull(req.query.id);
    } else {
      let newFriend = await Friendship.create({
        from_user: req.user._id,
        to_user: req.query.id,
      });

      user.friends.push(newFriend.to_user);
      user.save();
    }

    return res.status(200).json({
      data: user,
      message: "success",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "internal server err",
    });
  }
};
