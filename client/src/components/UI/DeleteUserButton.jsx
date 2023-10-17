import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { DELETE_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

function DeleteUserButton() {
  const { loading, data } = useQuery(QUERY_ME);
  const [deleteUser] = useMutation(DELETE_USER);

  const handleDeleteUser = async () => {
    try {
      if (data && data.me) {
        // Create a custom confirmation box
        const confirmationPhrase = window.prompt('To confirm account deletion, please type "DELETE MY ACCOUNT" (case-sensitive):');

        if (confirmationPhrase === 'DELETE MY ACCOUNT') {
          const { data: deleteUserData } = await deleteUser({
            variables: { id: data.me._id },
          });

          // Handle success or error
          console.log('User deleted:', deleteUserData.deleteUser);
          Auth.logout();
        } else {
          alert('Confirmation phrase did not match. Account deletion canceled.');
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDeleteUser}>Delete User</button>
    </div>
  );
}

export default DeleteUserButton;
