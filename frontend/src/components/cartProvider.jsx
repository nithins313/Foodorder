import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const addToCart = (item) => {
    setCart((prevCart) => {
      const newItem = {
        ...item,
        quantity: (prevCart[item.foodid]?.quantity || 0) + 1,
        price: item.price || 0,
        image: item.imgpath || "",
        name: item.foodname || "",
        restaurantId: item.restaurantId || 0,
      };
      return { ...prevCart, [item.foodid]: newItem };
    });
  };

  const removeFromCart = (item) => {
    setCart((prevCart) => {
      if (!prevCart[item.foodid]) return prevCart;

      const newItem = {
        ...prevCart[item.foodid],
        quantity: prevCart[item.foodid].quantity - 1,
      };
      if (newItem.quantity <= 0) {
        const { [item.foodid]: _, ...rest } = prevCart;
        return rest;
      }

      return { ...prevCart, [item.foodid]: newItem };
    });
  };

  const cartCount = Object.values(cart).reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, cartCount, setCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartContext;
