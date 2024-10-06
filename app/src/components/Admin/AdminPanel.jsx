import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // Important to load chart.js settings
const apiUrl = process.env.REACT_APP_PUBLIC_API_URL;

const AdminPanel = () => {
  const [stats, setStats] = useState({});
  const [orderData, setOrderData] = useState([]);

  // Fetch stats for users, products, orders, and visitors
  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${apiUrl}/stats`, {
          method: "GET",
          headers: {
            "auth-token": token,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${apiUrl}/allorders`, {
          method: "GET",
          headers: {
            "auth-token": token,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const orders = data.map((order) => ({
          date: order.date,
          total: order.total,
        }));
        setOrderData(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchStats();
    fetchOrders();
  }, []);

  // Chart data configuration
  const chartData = {
    labels: orderData.map((order) => new Date(order.date).toLocaleDateString()),
    datasets: [
      {
        label: "Order Totals",
        data: orderData.map((order) => order.total),
        backgroundColor: "rgba(75, 192, 192, 1)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Admin Dashboard
      </h1>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Users</h2>
          <p className="text-3xl font-bold text-blue-500">{stats.users}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Products</h2>
          <p className="text-3xl font-bold text-green-500">{stats.products}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Orders</h2>
          <p className="text-3xl font-bold text-purple-500">{stats.orders}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <h2 className="text-xl font-semibold text-gray-700">Visitors</h2>
          <p className="text-3xl font-bold text-red-500">{stats.visitors}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Order Totals Over Time
        </h2>
        <div className="h-64">
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
