// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Sample data for restaurants, replace with actual data
  const restaurants = [
    { id: 1, name: 'Restaurant A' },
    { id: 2, name: 'Restaurant B' },
    { id: 3, name: 'Restaurant C' },
  ];

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
