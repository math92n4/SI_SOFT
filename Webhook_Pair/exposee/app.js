import express from "express";
import fs from "fs";
import { fileURLToPath } from 'url';
import path from 'path';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE = path.join(__dirname, 'webhooks.json');


const loadWebhooks = () => {
    return JSON.parse(fs.readFileSync(FILE));
}

const saveWebhooks = (data) => {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

const acceptedEvents = [
    "payment_recieved",
    "payment_processed",
    "invoice_processed",
    "payment_completed"
]

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Webhook API',
            version: '1.0.0',
            description: 'API for subscribing and unsubscribing to webhooks',
        },
    },
    apis: ['./app.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       required:
 *         - url
 *         - events
 *       properties:
 *         url:
 *           type: string
 *           description: The URL to subscribe to
 *         events:
 *           type: array
 *           items:
 *             type: string
 *             enum: [payment_recieved, payment_processed, invoice_processed, payment_completed]
 *           description: List of events to subscribe to
 */

/**
 * @swagger
 * /subscribe:
 *   post:
 *     summary: Subscribe to webhook events
 *     description: Creates a new subscription for the specified events and URL.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *       400:
 *         description: Invalid payload or event
 */

app.post("/subscribe", (req, res) => {
    const { url, events } = req.body;

    if(!url || !Array.isArray(events)) {
        return res.status(400).send({ data: "Invalid payload" });
    }

    const webhooks = loadWebhooks();

    events.forEach((event) => {
        if(acceptedEvents.includes(event)) {
            webhooks.push({ url, events });
            saveWebhooks(webhooks);
        } else {
            return res.status(400).send({ data: `Invalid event: ${event}` })
        }
    })
    
    res.status(201).send({ data: "Subscription created" });
});


/**
 * @swagger
 * /unsubscribe:
 *   delete:
 *     summary: Unsubscribe from webhook events
 *     description: Removes a subscription based on the provided URL.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL to unsubscribe from
 *     responses:
 *       200:
 *         description: Successfully unsubscribed
 */
app.delete("/unsubscribe", (req, res) => {
    const { url } = req.body;
    const webhooks = loadWebhooks();

    webhooks.forEach((webhook) => {
        if(webhook.url === url) {
            webhooks.splice(webhook, 1)
            saveWebhooks(webhooks);
        }
    });

    return res.status(200).send({ data: `Url: ${url} unsubscribed` });
});

/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Ping all subscribed webhook URLs
 *     description: Sends a test POST request to each subscribed webhook with a test message.
 *     responses:
 *       200:
 *         description: Pings sent to all webhooks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         description: Webhook URL
 *                       events:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: Subscribed events (if successful)
 *                       error:
 *                         type: string
 *                         description: Error message if the ping failed
 */
app.get("/ping", async (req, res) => {
    const webhooks = loadWebhooks();
    const results = [];
  
    for (const webhook of webhooks) {
      try {
        const response = await fetch(webhook.url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "ping", message: "Ping from server" }),
        });
  
        results.push({ url: webhook.url, events: webhook.events });
      } catch (err) {
        results.push({ url: webhook.url, error: err.message });
      }
    }
  
    res.status(200).send({ data: results });
  });

app.post("/webhook", (req, res) => {
    console.log(req.body);
    res.send({ data: "Webhook called" })
})

const PORT = 8080;
app.listen(PORT, () => console.log(`App listening on ${PORT}`));

