require("dotenv").config();
const express = require("express");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const SECRET_KEY = process.env.SECRET;
const app = express.Router();

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  let hash = await argon2.hash(password);
  try {
    let NewUser = new UserModel({ username, email, password: hash });
    await NewUser.save();
    return res.status(200).send(NewUser);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await UserModel.findOne({ email: email });
  try {
    if (await argon2.verify(user.password, password)) {
      const token = jwt.sign({ email: email }, SECRET_KEY, {
        expiresIn: "7days",
      });
      return res
        .status(201)
        .json({ message: "login successful", token: token , username:user.username , email:email });
    } else {
      return res.status(401).send("INVALID CREDENTIALS");
    }
  } catch (e) {
    return res.status(401).send("INVALID CREDENTIALS");
  }
});

module.exports = app;
