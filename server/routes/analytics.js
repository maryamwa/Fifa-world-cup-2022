const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("../connectors/mongo.js");
const ObjectId = require("mongodb").ObjectID;
const client = MongoClient;

dotenv.config({ path: "../config.env" });

const router = express.Router();
router.get("/health", async (req, res) => {
  res.json({
    message: "analytics is working bro :)",
  });
});

router.get("/", async (req, res) => {


  const result = await client
    .db("fifa")
    .collection("Analytics")
    .find(
      { messageType: "TICKET_RESERVED" },
      { projection: { messageType: 0, _id: 0 } }
    ).
    toArray();

//if matchnumber is the same, add quantity to the same match and quantity less than 5 dont add it to the array
var result2 = [];
var matchNumber = [];
var quantity = [];

for (var i = 0; i < result.length; i++) {
  if (matchNumber.includes(result[i].matchNumber)) {
    var index = matchNumber.indexOf(result[i].matchNumber);
    quantity[index] += result[i].tickets[0].quantity;
  } else {
      matchNumber.push(result[i].matchNumber);
quantity.push(result[i].tickets[0].quantity);
   
   
  }
}

for (var i = 0; i < matchNumber.length; i++) {
if (quantity[i] >= 5) {

  result2.push({
    matchNumber: matchNumber[i],
    quantity: quantity[i],
  });
}
}

res.json(result2);




  //res.json(result);
});

router.post("/", async (req, res) => {
  const msg = req.body;

  const result = await client.db("fifa").collection("Analytics").insertOne(msg);
  res.json(result);
});

module.exports = router;
