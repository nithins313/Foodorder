// src/components/Restaurant.jsx
import React from 'react';

const Restaurant = ({ match }) => {
  const { id } = match.params;
  // Fetch restaurant details using id, replace with actual data fetching logic
  const restaurant = { id, name: `Restaurant ${id}`, menu: ['Item 1', 'Item 2'] };

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <ul>
        {restaurant.menu.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Restaurant;
