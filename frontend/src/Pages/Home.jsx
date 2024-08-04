// src/pages/HomePage.js
import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Restaurantlist from "../components/restaurant-list.jsx";
import ImageSlider from "../components/image-slider.jsx";

const Home = () => {
  return (
    <>
      <Header />

      <Restaurantlist />
      <Footer />
    </>
  );
};

export default Home;
