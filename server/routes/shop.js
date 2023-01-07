const express = require("express");
const { MongoClient } = require("../connectors/mongo.js");
const ObjectId = require("mongodb").ObjectID;

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const client = MongoClient;
    const result = await client
      .db("fifa")
      .collection("Shop")
      .find({})
      .toArray();
    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:_id", async (req, res) => {
  try {
    const client = MongoClient;
    const result = await client
      .db("fifa")
      .collection("Shop")
      .find({ _id: ObjectId(req.params._id) })
      .toArray();
    res.json(result);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
