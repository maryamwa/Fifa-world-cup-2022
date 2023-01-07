const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const client = new MongoClient(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect();
console.log("Connected to MongoDB :)");
exports.MongoClient = client;


