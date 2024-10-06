import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_your_public_key_here"); // Your Stripe public key
const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "", // Optional company name
    numerPodatkowy: "", // Optional numer podatkowy
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
    email: "",
    products: [], // Products to be purchased
    total: 0, // Total price
    paymentMethod: "stripe", // Default payment method
  });

  // Handles input changes for the form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handles the selection of the payment method
  const handlePaymentMethodChange = (e) => {
    setFormData({
      ...formData,
      paymentMethod: e.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
        <form className="space-y-4">
          {/* Input fields for personal details */}
          <div>
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          {/* Optional fields for company name and numer podatkowy */}
          <div>
            <label className="block text-gray-700">
              Company Name (Optional)
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">
              Numer Podatkowy (Optional)
            </label>
            <input
              type="text"
              name="numerPodatkowy"
              value={formData.numerPodatkowy}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          {/* Address and other fields */}
          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          {/* Payment Method Selection */}
          <div>
            <label className="block text-gray-700">Payment Method</label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="stripe"
                  checked={formData.paymentMethod === "stripe"}
                  onChange={handlePaymentMethodChange}
                  className="form-radio"
                />
                <span className="ml-2">Stripe</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handlePaymentMethodChange}
                  className="form-radio"
                />
                <span className="ml-2">Cash on Delivery (COD)</span>
              </label>
            </div>
          </div>

          {/* Display Total */}
          <div>
            <label className="block text-gray-700">
              Total: ${formData.total}
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg px-3 py-2 mt-3 hover:bg-blue-700"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
