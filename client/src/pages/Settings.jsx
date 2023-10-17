import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER, DELETE_USER } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import UpdateUserForm from '../components/UI/UpdateUserForm.jsx'
import DeleteUserButton from '../components/UI/DeleteUserButton.jsx'
import Auth from '../utils/auth';

function Settings() {
  const navigate = useNavigate();

  
  useEffect(() => {
    // This code will run after the component has been rendered
    if (!Auth.loggedIn()) {
      // Redirect to the homepage if the user is not logged in
      navigate('/');
    }
  }, []);

  if (Auth.loggedIn()) {
    // Redirect to the homepage if the user is not logged in
  return (
    <div>
      <h1>Settings</h1>
      <UpdateUserForm />
      <p>Delete Account:</p>
      <DeleteUserButton />
   </div>
  ); }
  }

export default Settings;
