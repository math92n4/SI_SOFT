import express from "express";
import fs from "fs";
import { fileURLToPath } from 'url';
import path from 'path';

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

app.get("/ping", async (req, res) => {
    const webhooks = loadWebhooks();

    for (const webhook of webhooks) {
        const events = webhook.events;

        for (const event of events) {
            await fetch(webhook.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(event)
            });
        }
    }

    res.send("Ping completed.");
});


const PORT = 8080;
app.listen(PORT, () => console.log(`App listening on ${PORT}`));

