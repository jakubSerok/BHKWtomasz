import React, { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [displayedOrders, setDisplayedOrders] = useState([]); // for paginated orders
  const [currentPage, setCurrentPage] = useState(1); // state for current page
  const [ordersPerPage, setOrdersPerPage] = useState(3); // state for orders per page

  useEffect(() => {
    fetch(`${apiUrl}/myorders`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("auth-token"), // Assuming token is in localStorage
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setDisplayedOrders(
          getPaginatedOrders(data, currentPage, ordersPerPage)
        );
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, [currentPage]);

  const getPaginatedOrders = (orders, currentPage, ordersPerPage) => {
    const startIndex = (currentPage - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    return orders.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Meine Bestellungen</h1>
      <div className="grid grid-cols-1 gap-4">
        {displayedOrders.length === 0 ? (
          <p>Keine Bestellungen gefunden.</p>
        ) : (
          displayedOrders.map((order) => (
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
      <div className="flex justify-center mt-10">
        {[...Array(Math.ceil(orders.length / ordersPerPage))].map(
          (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-2 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Orders;
