require("dotenv").config();

const dev = {
  app: {
    PORT: process.env.PORT || 4000,
  },
  MONGO_URL: {
    url: "mongodb://127.0.0.1:27017/MERN-jwt-auth" || process.env.MONGO_URL,
  },
  SECRET_KEY: "mynameisTaifur",
};

module.exports = dev;
