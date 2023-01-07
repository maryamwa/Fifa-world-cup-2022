const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const stripe = require("stripe")(process.env.STRIPE);
const { v4 } = require("uuid");
const { MongoClient } = require("../connectors/mongo.js");
const { sendKafkaMessage } = require("../connectors/kafkaProducer");
const { validateTicketReservationDto } = require("../validation/reservation");
const messagesType = require("../messages");
const express = require("express");
const router = express.Router();
const { result } = require("lodash");

var dbo = MongoClient.db("fifa");

router.get("/", async (req, res) => {
  return res.json({
    message: "Ticket Purchase Successful",
    email: "eshta@gmail.com",
    matchNumber: 2,
    tickets: [
      {
        category: 2,
        quantity: 2,
        price: 125,
      },
    ],
  });
});

router.post("/", async (req, res) => {
  try {
    const validationError = validateTicketReservationDto(req.body);
    if (validationError) {
      return res.status(403).send(validationError.message);
    }
    await sendKafkaMessage(messagesType.TICKET_PENDING, {
      meta: { action: messagesType.TICKET_PENDING },
      body: {
        matchNumber: req.body.matchNumber,
        tickets: req.body.tickets,
      },
    });

    const client = MongoClient;
    if (req.body.tickets[0].category == 1) {
      const result = await client
        .db("fifa")
        .collection("Shop")
        .updateOne(
          { matchNumber: req.body.matchNumber },
          {
            $inc: {
              "availability.category1.count": -req.body.tickets[0].quantity,
            },
            $max: { count: 0 },
          }
        );
    } else if (req.body.tickets[0].category == 2) {
      const result = await client
        .db("fifa")
        .collection("Shop")
        .updateOne(
          { matchNumber: req.body.matchNumber },
          {
            $inc: {
              "availability.category2.count": -req.body.tickets[0].quantity,
            },

            $max: { count: 0 },
          }
        );
    } else if (req.body.tickets[0].category == 3) {
      const result = await client
        .db("fifa")
        .collection("Shop")
        .updateOne(
          { matchNumber: req.body.matchNumber },
          {
            $inc: {
              "availability.category3.count": -req.body.tickets[0].quantity,
            },
            $max: { count: 0 },
          }
        );
    }

    try {
      const token = await stripe.tokens.create({
        card: {
          number: req.body.card.number,
          exp_month: req.body.card.expirationMonth,
          exp_year: req.body.card.expirationYear,
          cvc: req.body.card.cvc,
        },
      });
      await stripe.charges.create({
        amount: req.body.tickets[0].quantity * req.body.tickets[0].price,
        currency: "usd",
        source: token.id,
        description: "FIFA World Cup Ticket Reservation",
      });
      await sendKafkaMessage(messagesType.TICKET_RESERVED, {
        meta: { action: messagesType.TICKET_RESERVED },
        body: {
          matchNumber: req.body.matchNumber,
          tickets: req.body.tickets,
        },
      });
    } catch (stripeError) {
      await sendKafkaMessage(messagesType.TICKET_CANCELLED, {
        meta: { action: messagesType.TICKET_CANCELLED },
        body: {
          matchNumber: req.body.matchNumber,
          tickets: req.body.tickets,
        },
      });
      return res
        .status(400)
        .send(`could not process payment: ${stripeError.message}`);
    }

    const ticketReservation = { id: v4(), ...req.body };

    const reservation = dbo
      .collection("Reservations")
      .insertOne(ticketReservation)
      .then(function (result) {
        console.log("reservation inserted :)");
      });

    return res.json({
      message: "Ticket Purchase Successful",
      ...ticketReservation,
    });
  } catch (e) {
    return res.status(400).send(e.message);
  }
});

module.exports = router;
