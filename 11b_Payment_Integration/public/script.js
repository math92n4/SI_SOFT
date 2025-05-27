console.log("YO");

let stripe;
let elements;
let card;

document.getElementById('buy-button').addEventListener('click', async () => {

  document.getElementById('item').style.display = 'none';
  document.getElementById('payment-form').style.display = 'block';

  try {
    // Fetch my very secret key
    const configRes = await fetch('/config');
    const { data: publishableKey } = await configRes.json();

    stripe = Stripe(publishableKey);
    elements = stripe.elements();

    // Create and mount the card element
    card = elements.create('card');
    card.mount('#card-element');

    // Get client secret
    const intentRes = await fetch('/create-payment-intent', {
      method: 'POST',
    });
    const { clientSecret } = await intentRes.json();

    // Submit the payment
    const form = document.getElementById('payment-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
        },
      });

      const message = document.getElementById('payment-message');
      if (error) {
        message.textContent = `❌ ${error.message}`;
      } else if (paymentIntent.status === 'succeeded') {
        message.textContent = '✅ Payment succeeded!';
      }
    });

  } catch (err) {
    console.error('Error setting up payment:', err);
  }
});
