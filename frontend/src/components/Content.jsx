// src/components/Hero.js
import React from 'react';
import styled from 'styled-components';
import leftImage from '../assets/content.jpg'; // Replace with the correct path to your images
import rightImage from '../assets/contentImg.png'; // Replace with the correct path to your images

const Contents = () => {
  return (
    <HeroSection>
      <ImageContainer>
        <Image src={leftImage} alt="Left Image" />
        <Image src={rightImage} alt="Right Image" />
      </ImageContainer>
    </HeroSection>
  );
};

const HeroSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000; /* Set a background color if needed */
  color: #fff;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
`;

const Image = styled.img`
  width: 50%;
  height: 100%;
`;

export default Contents;
