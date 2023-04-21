const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("./config/db");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");
const sass = require("sass");

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

app.use(
  session({
    name: "majorProject2",
    secret: "supersecret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 100 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://127.0.0.1:27017/dataBase",
        autoRemove: "disabled",
      },
      {
        function(err) {
          console.log(err || "connect-mongodb setup ok");
        },
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use("/", require("./routes"));

app.listen(PORT, () => {
  console.log(`server is running on the port: ${PORT}`);
});
