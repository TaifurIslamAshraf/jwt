const express = require("express");
const cors = require("cors");
const passport = require("passport");
const app = express();

//database
require("./config/database");

//middelware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//passport
app.use(passport.initialize());
require("./config/passport");

//All routers
app.use("/", require("./routers/index.router"));
app.use("/", require("./routers/auth.router"));
app.use("/", require("./routers/users.router"));

//router error
app.use("*", (req, res, next) => {
  res.status(404).send("<h1>404 page not found</h1>");
  next();
});

//server error
app.use((err, req, res, next) => {
  res.status(500).send({
    message: "somthing broke",
    error: err.message,
  });
  console.log(err.message);
  next();
});

module.exports = app;
