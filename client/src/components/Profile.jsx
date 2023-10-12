import React from 'react';

function Profile() {
  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p>
        Welcome to your user profile! Here, you can view and manage your profile information.
      </p>
      <div className="profile-details">
        <h3>Your Information</h3>
        <p>
          <strong>Name:</strong> John Doe
        </p>
        <p>
          <strong>Email:</strong> john.doe@example.com
        </p>
        <p>
          <strong>Username:</strong> johndoe123
        </p>
      </div>
    </div>
  );
}

export default Profile;
