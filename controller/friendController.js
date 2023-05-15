const User = require("../models/user");
const Friendship = require("../models/friendship");

module.exports.addFriend = async (req, res) => {
  try {
    let deleteFriend = false;

    let friendship = await User.findById(req.query.id).populate("friends");

    // let isFriend = await Friendship.findOne({
    //   from_user:
    // });

    let user = await User.findById(req.user._id);

    // if(user.friends)

    // if (!firends) {
    //   return res.status(402).json({
    //     message: "User not found!",
    //   });
    // }
  } catch (e) {
    return res.status(500).json({
      message: "internal server err",
    });
  }
};
