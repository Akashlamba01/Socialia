const User = require("../models/user");
const Friendship = require("../models/friendship");

module.exports.addFriend = async (req, res) => {
  try {
    // console.log("myId: ", user.id);
    // console.log("queryId: ", req.query.id);

    if (req.user._id == req.query.id) {
      return res.status(402).json({
        message: "you can not send req youself!",
      });
    }

    let user = await User.findById(req.user._id);
    let isFriend = await Friendship.findOne({ to_user: req.query.id });

    // console.log("isFriend:", isFriend);

    if (isFriend) {
      if (isFriend.friendRequest != "accept") {
        isFriend.deleteOne();
        user.friends.pull(req.query.id);
        user.save();
      }
    } else {
      isFriend = await Friendship.findOne({ to_user: user.id });

      if (isFriend) {
        isFriend = await Friendship.findOneAndUpdate(
          { to_user: user.id },
          {
            $set: {
              friendRequest: "accept",
            },
          }
        );

        // console.log("queryid:", req.query.id);

        if (isFriend.friendRequest != "accept") {
          let userFriend = await User.findByIdAndUpdate(req.query.id);
          userFriend.friends.push(isFriend.to_user);
          userFriend.save();

          user.friends.push(isFriend.from_user);
          user.save();
        }
      } else {
        let newFriend = await Friendship.create({
          from_user: req.user._id,
          to_user: req.query.id,
        });

        console.log("create friend request", newFriend);
      }
    }

    // console.log("user: ", user);
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

module.exports.addFriends = async (req, res) => {
  try {
    if (req.user.id == req.query.id) {
      return res.status(402).json({
        message: "you can not send req to yourself!",
      });
    }

    let user = await User.findOne(req.user._id);
    let isFriend = await Friendship.findOne({ to_user: req.query.id });
    let newFriend;

    if (isFriend) {
      if (isFriend.friendRequest != "accept") {
        isFriend.deleteOne();
        user.friends.pull(req.query.id);
        user.save();
      }
      return res.status(200).json({
        message: "req removed!",
      });
    }

    newFriend = await Friendship.findOne({ to_user: req.user.id });

    if (!newFriend) {
      newFriend = await Friendship.create({
        from_user: req.user.id,
        to_user: req.query.id,
      });

      return res.status(201).json({
        message: "new req sent to new friend!",
        data: newFriend,
      });
    }

    newFriend = await Friendship.findOneAndUpdate(
      { to_user: user.id },
      {
        $set: {
          friendRequest: "accept",
        },
      }
    );

    if (newFriend.friendRequest != "accept") {
      let userFriend = await User.findById(req.query.id);

      userFriend.friends.push(newFriend.to_user);
      userFriend.save();

      user.friends.push(newFriend.from_user);
      user.save();
    }

    return res.status(200).json({
      message: "req sent or accept!",
      data: newFriend,
    });
  } catch (e) {
    console.log(e);
    return res.status(505).json({
      message: "internal server err!",
    });
  }
};

// else {
//   let newFriend = await Friendship.create({
//     from_user: req.user.id,
//     to_user: req.query.id,
//   });

//   console.log("friend request sent!", newFriend);
// }
