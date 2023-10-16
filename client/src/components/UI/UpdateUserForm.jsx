import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

function UpdateUserForm() {
  const { loading, data } = useQuery(QUERY_ME);
  const [updateUser] = useMutation(UPDATE_USER);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });

  // Use the data from the QUERY_ME query to set the initial form values
  useEffect(() => {
    if (data && data.me) {
      setFormData({
        name: data.me.name,
        username: data.me.username,
        password: '',
      });
    }
  }, [data]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (data && data.me) { // Check if data and data.me exist
        const { data: updateUserData } = await updateUser({
          variables: { id: data.me._id, input: formData },
        });
  
        // Handle success or error
        console.log('User updated:', updateUserData.updateUser);
  
        // Clear form fields
        setFormData({
          name: '',
          username: '',
          password: '',
        });
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <p>New Name:</p>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <p>New Username:</p>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <p>New Password:</p>
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button class = "p-2" type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateUserForm;
