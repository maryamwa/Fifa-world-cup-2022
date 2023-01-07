const express = require("express");
const Stripe = require("stripe");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });
const stripe = Stripe(process.env.STRIPE);

const router = express.Router();
router.get("/", async (req, res) => {
  res.json({
    message: "payment is working bro :)",
  });
});
router.post("/", async (req, res) => {
  const { email, tickets, matchNumber } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: tickets.map((ticket) => ({
      name: `Match ${matchNumber} - Category ${ticket.category}`,
      description: `Match ${matchNumber} - Category ${ticket.category}`,
      amount: ticket.price * 100,
      currency: "usd",
      quantity: ticket.quantity,
    })),
    success_url: `https://google.com`,
    cancel_url: `https://google.com`,
  });

  console.log("waddi");


    res.json({ id: session.id });
  

});



module.exports = router;




