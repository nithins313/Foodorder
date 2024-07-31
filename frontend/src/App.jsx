import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Restaurant from './components/Restaurant';
import Order from './components/Order';
import Review from './components/Review';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  console.log('Rendering App');
  return (
    <Router>
      <div justify-center>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<Restaurant />} />
          <Route path="/order" element={<Order />} />
          <Route path="/review" element={<Review />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
