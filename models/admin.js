const { Schema, model } = require("mongoose");

const AdminSchema = new Schema(
  {
    company_name: { type: String, required: true },
    position: { type: String, required: true },
    contract: { type: String, required: true },
    location: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AdminModel = new model("job", AdminSchema);

module.exports = AdminModel;
