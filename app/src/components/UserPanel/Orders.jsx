import React, { useState, useEffect } from "react";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/myorders", {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">My Orders</h1>
      {orders.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
              <p className="text-sm mb-1">
                <strong>Status:</strong> {order.status}
              </p>
              <p className="text-sm mb-1">
                <strong>Date:</strong>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
              <p className="text-sm mb-2">
                <strong>Total:</strong> ${order.total}
              </p>
              <h3 className="font-medium">Products:</h3>
              <ul className="list-disc list-inside">
                {order.products.map((product, index) => (
                  <li key={index}>
                    {product.name} - {product.quantity} pcs
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no orders yet.</p>
      )}
    </div>
  );
};

export default Order;
