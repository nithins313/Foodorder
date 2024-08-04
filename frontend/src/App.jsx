// src/App.js
import React, { createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import DishList from "./components/dish-list.jsx";
import Cart from "./components/cart.jsx";
import { CartProvider } from "./components/cartProvider.jsx";
import Profile from "./components/profile.jsx";
const App = () => {
  const [cart, setCart] = React.useState({});
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:rid" element={<DishList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
