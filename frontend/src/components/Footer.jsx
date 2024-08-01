// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2024 Foodorder. All Rights Reserved.</FooterText>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  padding: 20px;
  text-align: center;
  background-color: #000;
  color: #fff;
`;

const FooterText = styled.p`
  font-size: 1em;
`;

export default Footer;
