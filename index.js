const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./config/db");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const PORT = 8000;

// app.use(express.static("./assets"));
app.use(express.urlencoded());
app.use(cookieParser());

//layouts set
app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("assets"));

app.use("/", require("./routes"));

app.listen(PORT, () => {
  console.log(`server is running on the port: ${PORT}`);
});
