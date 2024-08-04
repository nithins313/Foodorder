import React, { useState, useEffect } from "react";
import RestaurantCard from "./restaurant-card";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5500/restaurant/restaurant")
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="w-[1100px] mx-auto">
      <div>
        <h1 className="text-3xl my-3">Restaurants in Coimbatore</h1>
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.restaurantid}
            resData={{
              name: restaurant.restaurantname,
              rid: restaurant.restaurantid,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
