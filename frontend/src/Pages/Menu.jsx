// src/pages/MenuPage.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

const Order = () => {
  return (
    <>
      <Header />
      <Main>
        <Title>Our Menu</Title>
        <MenuList>
          <MenuItem>
            <MenuImage src="/path-to-image/pizza.jpg" alt="Pizza" />
            <MenuName>Pizza</MenuName>
            <MenuDescription>Delicious cheese pizza with fresh ingredients.</MenuDescription>
            <MenuPrice>$12.99</MenuPrice>
          </MenuItem>
          <MenuItem>
            <MenuImage src="/path-to-image/burger.jpg" alt="Burger" />
            <MenuName>Burger</MenuName>
            <MenuDescription>Juicy burger with lettuce, tomato, and cheese.</MenuDescription>
            <MenuPrice>$9.99</MenuPrice>
          </MenuItem>
          <MenuItem>
            <MenuImage src="/path-to-image/salad.jpg" alt="Salad" />
            <MenuName>Salad</MenuName>
            <MenuDescription>Fresh garden salad with a variety of vegetables.</MenuDescription>
            <MenuPrice>$7.99</MenuPrice>
          </MenuItem>
        </MenuList>
      </Main>
      <Footer />
    </>
  );
};

const Main = styled.main`
  padding: 50px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3em;
  margin-bottom: 20px;
`;

const MenuList = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const MenuItem = styled.div`
  max-width: 300px;
  text-align: center;
`;

const MenuImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const MenuName = styled.h2`
  font-size: 1.5em;
  margin: 10px 0;
`;

const MenuDescription = styled.p`
  font-size: 1em;
  margin-bottom: 10px;
`;

const MenuPrice = styled.p`
  font-size: 1.2em;
  font-weight: bold;
`;

export default Order;
