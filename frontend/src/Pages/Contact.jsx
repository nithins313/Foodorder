// src/pages/ContactPage.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

const Contact = () => {
  return (
    <>
      <Header />
      <Main>
        <Title>Contact Us</Title>
        <ContactForm>
          <FormField>
            <Label>Name</Label>
            <Input type="text" placeholder="Your Name" />
          </FormField>
          <FormField>
            <Label>Email</Label>
            <Input type="email" placeholder="Your Email" />
          </FormField>
          <FormField>
            <Label>Message</Label>
            <TextArea placeholder="Your Message" />
          </FormField>
          <SubmitButton>Send Message</SubmitButton>
        </ContactForm>
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

const ContactForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 1.2em;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 150px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2em;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export default Contact;
