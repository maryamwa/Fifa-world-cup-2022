const { Kafka } = require("kafkajs");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const messages = require("../messages.js");
const validate = require("../validation/kafka.js");

const kafka = new Kafka({
  clientId: `${process.env.CLIENT_ID}-${process.env.ENV}`,
  brokers: [process.env.KAFKA_BROKERS],
  ssl: true,
  logLevel: 2,
  sasl: {
    mechanism: "plain",
    username: process.env.KAFKA_SASL_USERNAME,
    password: process.env.KAFKA_SASL_PASSWORD,
  },
});

const topic = `${process.env.TOPIC_FIFA_TICKET_SALES}-${process.env.ENV}`;
const producer = kafka.producer();

const startKafkaProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer Connected");
};

const sendKafkaMessage = async (messageType, message) => {
  // validate kafka message against schema prior to sending
  const validationError = validate.kafkaMessage(message);
  if (validationError) {
    return Promise.reject(validationError);
  }

  // send message to kafka broker
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });

  // successfully exit
  return Promise.resolve();
};

module.exports = {
  startKafkaProducer,
  sendKafkaMessage,
};
