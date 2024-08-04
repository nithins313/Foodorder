import React, { useState } from "react";
import { useCart } from "./cartProvider";
import Header from "./Header";

const Cart = () => {
  const { cart, addToCart, removeFromCart, serCart } = useCart();
  const cartItems = Object.keys(cart).map((key) => cart[key]);
  const [placed, setplaced] = useState(false);
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      return total + (isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);
  };

  const handleOrder = async () => {
    try {
      const usr = localStorage.getItem("username");
      const response = await fetch("http://127.0.0.1:5500/order/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usrname: usr,
          items: cartItems.map((item) => ({
            foodid: item.foodid,
            resid: item.restaurantId,
            quantity: item.quantity,
          })),
        }),
      });

      if (response.ok) {
        setplaced(true);
        serCart({});
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    }
  };

  return (
    <>
      <Header />
      <div className="inline w-1000px justify-center items-center m-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {cartItems.length === 0 || placed ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg"
              >
                <img
                  src={"/image/" + item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => removeFromCart(item)}
                      className="px-2 py-1 bg-red-500 text-white rounded-full"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-2 py-1 bg-green-500 text-white rounded-full"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="text-lg font-bold">
                  ₹
                  {!isNaN(item.price * item.quantity)
                    ? (item.price * item.quantity).toFixed(2)
                    : "0.00"}
                </p>
              </div>
            ))}
            <div className="flex justify-end items-center mt-4">
              <p className="text-xl font-bold">
                Total: ₹{calculateTotalPrice().toFixed(2)}
              </p>
            </div>
            <button
              onClick={handleOrder}
              className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
            >
              Place Order
            </button>
          </div>
        )}
        {placed && <p className="text-3xl">Order placed successfully</p>}
      </div>
    </>
  );
};

export default Cart;
