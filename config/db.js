require("dotenv").config();
const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log("error in connection");
      } else {
        console.log("mongodb connected successfully.");
      }
    }
  );
};

module.exports = connect;
