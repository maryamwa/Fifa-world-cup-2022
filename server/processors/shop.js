const axios = require("axios");
const url = "http://localhost:5000/api/analytics/";
const { MongoClient } = require("../connectors/mongo.js");
const client = MongoClient;

const processPendingTicket = async (message) => {
  const data = {
    matchNumber: message.body.matchNumber,
    tickets: message.body.tickets,
    messageType: message.meta.action,
  };
  axios.post(url, data).then(() => {
    console.log("done analytics!");
  });

  console.log("[processPendingTicket]", message);
  return Promise.resolve("[processPendingTicket]");
};

const processCancelledTicket = async (message) => {
  const data = {
    matchNumber: message.body.matchNumber,
    tickets: message.body.tickets,
    messageType: message.meta.action,
  };
  axios.post(url, data).then(() => {
    console.log("done analytics!");
  });

  console.log("[processCancelledTicket]", message);
  return Promise.resolve("[processCancelledTicket]");
};

const processReservedTicket = async (message) => {
  const data = {
    matchNumber: message.body.matchNumber,
    tickets: message.body.tickets,
    messageType: message.meta.action,
  };
  axios.post(url, data).then(() => {
    console.log("done analytics!");
  });

  console.log("[processReservedTicket]", message);
  return Promise.resolve("[processReservedTicket]");
};

const processMasterlist = async (message) => {
  console.log("[processMasterlist]", message);

  return Promise.resolve("[processMasterlist]");
};

module.exports = {
  processPendingTicket,
  processReservedTicket,
  processCancelledTicket,
  processMasterlist,
};
