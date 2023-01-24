const express = require("express");
const AdminModel = require("../models/admin");
const app = express.Router();
app.get("/", async (req, res) => {
  try {
    let job = await AdminModel.find();
    res.send(job);
  } catch (e) {
    res.send({ message: e.message });
  }
});

app.post("/job", async (req, res) => {
  const { company_name, position, contract, location } = req.body;
  try {
    let jobs = new AdminModel({
      company_name: company_name,
      position: position,
      contract: contract,
      location: location,
    });
    await jobs.save();
    return res.status(200).send(jobs);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await AdminModel.findByIdAndDelete(id);
    return res.status(200).send({ message: "Deleted" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

app.get("/search/:key", async (req, res) => {
  let result = await AdminModel.find({
    $or: [
      {
        company_name: { $regex: req.params.key },
      },
    ],
  });
  res.send(result);
});
module.exports = app;
