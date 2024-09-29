import React, { useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { ShopContext } from "../../components/Context/ShopContext";

const stripePromise = loadStripe("YOUR_PUBLISHABLE_KEY"); // Replace with your Stripe public key

const Checkout = () => {
  const { getTotalCartAmount } = useContext(ShopContext);

  const handleCheckout = async (event) => {
    event.preventDefault();
    const stripe = await stripePromise;

    // Call your backend to create the Checkout session
    const response = await fetch(
      "http://localhost:3001/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: getTotalCartAmount() * 100 }), // Amount in cents
      }
    );

    const session = await response.json();
    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handleCheckout}>Pay Now</button>
    </div>
  );
};

export default Checkout;
