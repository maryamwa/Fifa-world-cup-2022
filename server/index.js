const express = require("express");
const cors = require("cors");
const { startKafkaProducer } = require("./connectors/kafkaProducer.js");
const { startKafkaConsumer } = require("./connectors/kafkaConsumer.js");
const isBot = require("isbot");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const port = 5000;

const shoproute = require("./routes/shop.js");
const aroute = require("./routes/analytics");
const reservationsroute = require("./routes/reservations.js");

const app = express();
app.use(limiter);
app.use(express.json());
app.use(cors());

app.use("/api/shop", shoproute);
app.use("/api/analytics", aroute);
app.use("/api/reservations", reservationsroute);

app.use((req, res, next) => {
  if (isBot(req)) {
    return res.status(403).send("Forbidden");
  }
});

app.listen(port, () => {
  startKafkaProducer();
  startKafkaConsumer();
  console.log(`Server is running on port: ${port}`);
});
