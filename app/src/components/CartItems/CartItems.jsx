import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import remoe_icon from "../../assets/admin/cross_icon.png";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("Ysk_test_7mJuPfZsBzc3JkrANrFrcDqC"); // Replace with your Stripe public key

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);

  const isEmpty = Object.values(cartItems).every((value) => value === 0);

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
    <div className="my-[100px] mx-[20px] md:mx-[170px]">
      <div className="grid grid-cols-6 items-center gap-[20px] md:gap-[75px] py-[20px] text-[#454545] text-[16px] md:text-[18px] font-semibold">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr className="h-[3px] bg-[#e2e2e2]" />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="grid grid-cols-6 items-center gap-[20px] md:gap-[75px] py-[20px] text-[#454545] text-[14px] md:text-[17px] font-medium">
                <img src={e.images} className="h-[62px]" alt="" />
                <p>{e.title}</p>
                <p>${e.price}</p>
                <button className="w-[50px] md:w-[64px] h-[40px] md:h-[50px] border-[#ebebeb] border-2 bg-[#fff]">
                  {cartItems[e.id]}
                </button>
                <p className="block">${e.price * cartItems[e.id]}</p>
                <img
                  src={remoe_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  className="w-[15px] mx-[20px] md:mx-[40px] cursor-pointer"
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="flex flex-col md:flex-row my-[50px] md:my-[100px]">
        <div className="flex flex-1 flex-col md:mr-[200px] gap-[40px]">
          <h1 className="text-[20px] md:text-[24px]">Cart Totals</h1>
          <div>
            <div className="flex justify-between py-[15px]">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="flex justify-between py-[15px]">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="flex justify-between py-[15px]">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className={`w-full md:w-[262px] h-[50px] md:h-[58px] ${
              isEmpty ? "bg-[#ccc] cursor-not-allowed" : "bg-[#ff5a5a]"
            } text-white font-semibold text-[14px] md:text-[16px] cursor-pointer text-center`}
            disabled={isEmpty} // Disable button if cart is empty
          >
            {isEmpty ? "Cart is empty" : "PROCEED TO CHECKOUT"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
