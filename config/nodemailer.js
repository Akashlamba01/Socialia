const nodemailer = require("nodemailer");
require("dotenv").config();
const ejs = require("ejs");
const path = require("path");

let testAccount = nodemailer.createTestAccount();

let transporter = nodemailer.createTransport({
  //   service: "gmail",
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "friedrich.schoen83@ethereal.email",
    pass: "S3N3aeQPGbJWraJetR", // generated ethereal password
  },
});

let renderTemplate = (data, relavivePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relavivePath),
    data,
    (err, template) => {
      if (err) {
        console.log("err rendering template");
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
