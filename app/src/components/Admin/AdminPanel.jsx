import React, { useEffect, useState } from "react";

const AdminPanel = () => {
  const [data, setData] = useState({
    currentVisitors: 0,
    visitorsThisWeek: 0,
    visitorsThisMonth: 0,
    totalAccounts: 0,
    totalProducts: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/admin/dashboard"); // Your API endpoint
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold">Current Visitors</h2>
          <p className="text-2xl">{data.currentVisitors}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold">Visitors This Week</h2>
          <p className="text-2xl">{data.visitorsThisWeek}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold">Visitors This Month</h2>
          <p className="text-2xl">{data.visitorsThisMonth}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold">Total Accounts</h2>
          <p className="text-2xl">{data.totalAccounts}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-2xl">{data.totalProducts}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-2xl">{data.totalOrders}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
