import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER, DELETE_USER } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

function Settings() {
  if (!Auth.loggedIn()) {
    // Redirect to the homepage if the user is not logged in
    window.location.assign('/');
    return null;
  }
  const { loading, data } = useQuery(QUERY_ME);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

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

  const handleDeleteUser = async () => {
    try {
      if (data && data.me) {
        const { data: deleteUserData } = await deleteUser({
          variables: { id: data.me._id },
        });
  
        // Handle success or error
        console.log('User deleted:', deleteUserData.deleteUser);
        Auth.logout();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Settings</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
      <button onClick={handleDeleteUser}>Delete User</button>
    </div>
  );
}

export default Settings;
