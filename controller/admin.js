const express = require("express");
const AdminModel = require("../models/admin");
const app = express.Router();

app.get("/", async (req, res) => {
  try {
    let job = await AdminModel.find();
    return res.send({ message: "success", data: job });
  } catch (e) {
    res.send({ message: e.message });
  }
});

app.post("/job", async (req, res) => {
  const { company_name, position, contract, location } = req.body;
  try {
    let jobs = new AdminModel({
      company_name: company_name.toUpperCase(),
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
    res.status(500).send({
      status: 500,
      message: `Something wen't wrong`,
    });
  }
});

app.put("/update/:id", async (req, res) => {
  const { company_name, position, contract, location } = req.body;
  const id = req.params.id;
  try {
    const user = await AdminModel.findByIdAndUpdate(
      id,
      {
        company_name: company_name.toUpperCase(),
        position: position,
        contract: contract,
        location: location,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    if (!user) {
      return res.status(500).send({
        status: 500,
        message: `user not found with id ${id}`,
      });
    }
    res.status(200).send({
      status: 200,
      message: "Update successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: `Something wen't wrong`,
    });
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
  res.send({ message: "success", data: result });
});

app.get("/data", async (req, res) => {
  const { location, contract } = req.query;

  try {
    if (location && contract) {
      let job = await AdminModel.find({
        location: location,
        contract: contract,
      });
      return res.send({ message: "success", data: job });
    } else if (location) {
      let job = await AdminModel.find({ location: location });
      return res.send({ message: "success", data: job });
    } else if (contract) {
      let job = await AdminModel.find({ contract: contract });
      return res.send({ message: "success", data: job });
    } else {
      let job = await AdminModel.find();
      return res.send({ message: "success", data: job });
    }
  } catch (e) {
    res.send({ message: e.message });
  }
});

module.exports = app;
