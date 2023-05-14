const User = require("../models/user");
const Friendship = require("../models/friendship");

module.exports.addFriend = async (req, res) => {
  try {
    let deleteFriend = false;

    let firends = await User.findById(req.query.id).populate("firends");

    let isFriend = await Friendship.findOne({});

    if (!firends) {
      return res.status(402).json({
        message: "User not found!",
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "internal server err",
    });
  }
};
