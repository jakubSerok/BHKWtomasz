import React, { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;
const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/myorders`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"), // Assuming token is in localStorage
      },
    })
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Meine Bestellungen</h1>
      <div className="grid grid-cols-1 gap-4">
        {orders.length === 0 ? (
          <p>Keine Bestellungen gefunden.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">
                Bestellung #{order.id} - {order.status}
              </h2>
              <p>Gesamt: €{order.total}</p>

              {/* Display each product's title, price, and quantity */}
              <div>
                <h3 className="font-semibold">Produkte:</h3>
                <ul className="list-disc list-inside">
                  {order.products.map((product, index) => (
                    <li key={index}>
                      <p>Titel: {product.title}</p>
                      <p>Preis: €{product.price}</p>
                      <p>Menge: {product.quantity}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-2">
                Datum: {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
