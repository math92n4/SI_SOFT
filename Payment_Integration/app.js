import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/config", (req, res) => {
    res.send({ data: process.env.STRIPE_PUBLISHABLE_KEY })
})

app.post('/create-payment-intent', async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 199 * 100,
        currency: "dkk",
        automatic_payment_methods: { enabled: true },
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });

    } catch (err) {
      res.status(500).send({ error: err.message });
    }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`App running on port: ${PORT}`));