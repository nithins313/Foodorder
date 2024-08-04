import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { useCart } from "./cartProvider";

const DishList = () => {
  const { rid } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    fetch(`http://127.0.0.1:5500/restaurant/dishs?rid=${rid}`)
      .then((response) => response.json())
      .then((data) => {
        setRestaurant(data.restaurant);
        setFoodItems(data.foodItems);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [rid]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className="w-[1000px] mx-auto">
        <div className="mx-auto justify-center text-center items-center inline-block w-[1000px] h-fit z-10 shadow-lg">
          <h1 className="text-4xl">{restaurant.name}</h1>
          <p className="text-xl">Phone: {restaurant.phoneno}</p>
          <p className="text-xl">Address: {restaurant.address}</p>
        </div>
        <div className="inline-block">
          {foodItems.map((dish) => (
            <div
              key={dish.foodid}
              className="dish-list w-full h-fit inline-flex border p-4 rounded-lg shadow-md"
            >
              <img
                src={`/image/${dish.imgpath}`}
                alt={dish.foodname}
                className="w-[200px] h-[200px] object-cover rounded-lg"
              />
              <div className="ml-4 flex-grow">
                <h3 className="font-semibold text-lg truncate overflow-hidden whitespace-nowrap">
                  {dish.foodname}
                </h3>
                <p>{dish.description}</p>
                <p className="text-xl font-bold">₹{dish.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded-lg"
                    onClick={() => removeFromCart(dish)}
                  >
                    -
                  </button>
                  <span className="mx-2 text-lg">
                    {cart[dish.foodid]?.quantity || 0}
                  </span>
                  <button
                    className="bg-green-500 text-white py-1 px-3 rounded-lg"
                    onClick={() => addToCart(dish)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DishList;
