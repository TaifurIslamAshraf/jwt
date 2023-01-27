const mongoose = require("mongoose");
const MONGO_URL = require("./config").MONGO_URL.url;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Mondodb is connected");
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
