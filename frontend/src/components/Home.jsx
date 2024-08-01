import React from "react";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <div>
      <h1>Welcome to Foodorder</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <Link to={`/restaurant/${restaurant.id}`}>{restaurant.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
