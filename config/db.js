const mongoose = require("mongoose");

const db = mongoose
  .connect("mongodb://127.0.0.1:27017/dataBase")
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("db not connected: ", err);
  });

module.exports = db;
