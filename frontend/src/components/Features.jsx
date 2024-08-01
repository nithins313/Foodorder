// src/components/Features.js
import React from 'react';
import styled from 'styled-components';

const Features = () => {
  return (
    <FeaturesSection>
      <Feature>
        <FeatureTitle>Fast Delivery</FeatureTitle>
        <FeatureDescription>Get your food delivered to you in no time.</FeatureDescription>
      </Feature>
      <Feature>
        <FeatureTitle>Fresh Ingredients</FeatureTitle>
        <FeatureDescription>We use only the freshest ingredients.</FeatureDescription>
      </Feature>
      <Feature>
        <FeatureTitle>Best Chefs</FeatureTitle>
        <FeatureDescription>Our chefs are world-renowned.</FeatureDescription>
      </Feature>
    </FeaturesSection>
  );
};

const FeaturesSection = styled.section`
  display: flex;
  justify-content: space-around;
  padding: 50px 0;
  background-color: #f9f9f9;
`;

const Feature = styled.div`
  max-width: 300px;
  text-align: center;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 1em;
`;

export default Features;
