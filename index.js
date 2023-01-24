require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const UserModel = require("./controller/user");
const AdminModel = require("./controller/admin");
const PORT = process.env.PORT;
const app = express();
app.use(express.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);
app.use(cors());
app.use(express.json());
app.use("/user", UserModel);
app.use("/admin", AdminModel);
app.listen(PORT, async (req, res) => {
  await connect();
  console.log("server started successfully");
});
