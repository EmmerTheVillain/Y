// UserRegistration.jsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations'; // Import your mutation operation

function UserRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });

  const [createUser] = useMutation(CREATE_USER); // Use the mutation operation here

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [error, setError] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Before createUser mutation');
  try {
    const { data } = await createUser({ variables: { input: formData } });
    const token = data.createUser.token; // Extract the token
    localStorage.setItem('token', token); // Store the token in local storage
    console.log('User registered:', data.createUser);
    // Optionally, handle successful registration (e.g., redirect to a protected page)
  } catch (error) {
    console.error('Registration failed:', error);
    console.log(formData);
    // Display the error message to the user
    setError(error); // You can use state to display this error message
  }
  console.log('After createUser mutation');
};

  return (
    <div>
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default UserRegistration;
