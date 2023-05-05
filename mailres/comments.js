const nodemailer = require("../config/nodemailer");
// cons;

exports.newComment = async (comment) => {
  console.log("jdljldkjldkjkldjlkdjlk", comment.user.email);
  try {
    let info = await nodemailer.transporter.sendMail({
      from: "date-chat@gmail.com", // sender address
      to: comment.user.email, // list of receivers
      subject: "password", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>S3N3aeQPGbJWraJetR</b>", // html body
    });

    console.log("send: ", info);
    return;
  } catch (error) {
    console.log("error form sending mail", error);
    return;
  }
};
