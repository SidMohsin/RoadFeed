import React, { useState } from 'react';
import styled from 'styled-components';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',  
    feedback: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Here you can implement the API to submit the feedback and image to the server
  };

  return (
    <FormWrapper id="feedback">
      <FormTitle>Submit Feedback on Road Conditions</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Label>Name</Label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Your Name"
          required
        />

        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Your Email"
          required
        />

        <Label>Feedback</Label>
        <TextArea
          name="feedback"
          value={formData.feedback}
          onChange={handleInputChange}
          placeholder="Describe the road conditions"
          required
        />

        <Label>Upload Image</Label>
        <Input type="file" name="image" onChange={handleImageChange} />

        <SubmitButton type="submit">Submit Feedback</SubmitButton>
      </Form>
    </FormWrapper>
  );
};

// Styled components
const FormWrapper = styled.div`
  padding: 2rem;
  background-color: #f7f9fa;
  max-width: 600px;
  margin: 2rem auto;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #084c61;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 0.5rem 0;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const SubmitButton = styled.button`
  padding: 0.7rem;
  background-color: #084c61;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #066a81;
  }
`;

export default FeedbackForm;