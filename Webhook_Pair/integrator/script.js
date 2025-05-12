
const subscribePayload = {
    "url": "https://webhook-test-iok2.onrender.com/webhook",
    "events": [
        "payment_received",
        "payment_processed",
        "invoice_processed",
        "payment_completed"
    ]
};

const url = "https://kea-soft-system-integration-2025-spring.onrender.com";


const subscibe = async () => {
    await fetch(`${url}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscribePayload)
    });
}

const ping = async () => {
    await fetch(`${url}/ping`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

const unsubscribe = async () => {
    await fetch(`${url}/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: subscribePayload.url })
    });
}

(async () => { 
    await subscibe();
    await ping();
    await unsubscribe();
})();
