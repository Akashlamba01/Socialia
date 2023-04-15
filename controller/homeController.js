module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // res.cookie("id", 34);
  return res.render("home", {
    title: "home side",
  });
};
