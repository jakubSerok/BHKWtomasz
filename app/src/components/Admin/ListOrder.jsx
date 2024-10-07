import React, { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [displayedOrders, setDisplayedOrders] = useState([]); // for paginated orders
  const [currentPage, setCurrentPage] = useState(1); // state for current page
  const [ordersPerPage, setOrdersPerPage] = useState(4); // state for orders per page

  useEffect(() => {
    fetch(`${apiUrl}/allorders`, {
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
      .catch((error) => console.error("Error fetching all orders:", error));
  }, [currentPage]);

  const getPaginatedOrders = (orders, currentPage, ordersPerPage) => {
    const startIndex = (currentPage - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    return orders.slice(startIndex, endIndex);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    fetch(`${apiUrl}/updateorderstatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ id: orderId, status: newStatus }),
    })
      .then((response) => response.json())
      .then((updatedOrder) => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === updatedOrder.order.id ? updatedOrder.order : order
          )
        );
      })
      .catch((error) => console.error("Error updating order status:", error));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Alle Bestellungen (Admin)</h1>
      <div className="grid grid-cols-4 gap-4">
        {displayedOrders.length === 0 ? (
          <p>Keine Bestellungen gefunden.</p>
        ) : (
          displayedOrders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">
                Bestellung #{order.id} - {order.status}
              </h2>
              <p>
                <strong>Benutzerinformationen:</strong>
              </p>
              <p>Vorname: {order.firstName}</p>
              <p>Nachname: {order.lastName}</p>
              {order.companyName && <p>Firmenname: {order.companyName}</p>}
              {order.numerPodatkowy && (
                <p>Steuernummer: {order.numerPodatkowy}</p>
              )}
              <p>Adresse: {order.address}</p>
              <p>Stadt: {order.city}</p>
              <p>Bundesland: {order.state}</p>
              <p>Postleitzahl: {order.postalCode}</p>
              <p>Land: {order.country}</p>
              <p>Telefon: {order.phone}</p>
              <p>Email: {order.email}</p>
              <p>Zahlungsmethode: {order.paymentMethod}</p>

              <p className="mt-4">
                <strong>Produkte:</strong>
              </p>
              <ul className="list-disc list-inside">
                {order.products.map((product, index) => (
                  <li key={index}>
                    <p>Titel: {product.title}</p>
                    <p>Preis: €{product.price}</p>
                    <p>Menge: {product.quantity}</p>
                  </li>
                ))}
              </ul>

              <p className="mt-4">Gesamt: €{order.total}</p>
              <p>Datum: {new Date(order.date).toLocaleDateString()}</p>

              <div className="mt-4">
                <select
                  className="border p-2"
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                >
                  <option value="pending">Ausstehend</option>
                  <option value="shipped">Versandt</option>
                  <option value="delivered">Zugestellt</option>
                  <option value="cancelled">Storniert </option>
                </select>
              </div>
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

export default AdminOrders;
