const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
  },
  { versionKey: false, timestamps: true }
);

const UserModel = new model("user", UserSchema);

module.exports = UserModel;
