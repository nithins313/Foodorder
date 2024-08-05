import React, { useEffect, useState } from "react";
import Header from "./Header";

const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          throw new Error("No username found in local storage");
        }

        const response = await fetch("http://127.0.0.1:5500/order/history", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!data) return <p className="text-center text-white">No data available</p>;

  const { user, orders } = data;

  return (
    <>
      <Header />
      <div className="max-w-[1000px] mx-auto p-6 text-white">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">User Details</h1>
          <div className="bg-gray-800 p-4 rounded shadow-md">
            <p className="mb-2">
              <span className="font-semibold">Username:</span> {user.username}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Phone No:</span> {user.phoneNo}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Address:</span> {user.address}
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">Order History</h1>
          {orders.map((order) => (
            <div key={order.orderId} className="mb-6">
              <div className="bg-gray-700 p-4 rounded shadow-md mb-2">
                <h2 className="text-xl font-semibold">Order ID: {order.orderId}</h2>
                <p className="text-gray-300">Items:</p>
              </div>
              <ul className="list-disc pl-5">
                {order.items.map((item) => (
                  <li key={item.id} className="mb-2">
                    <div className="bg-gray-800 p-2 rounded shadow-sm">
                      <p className="mb-1">
                        <span className="font-semibold">Item Name:</span> {item.itemName}
                      </p>
                      <p className="mb-1">
                        <span className="font-semibold">Quantity:</span> {item.quantity}
                      </p>
                      <p className="mb-1">
                        <span className="font-semibold">Price:</span> ₹{item.price.toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
