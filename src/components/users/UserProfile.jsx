import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import UserNavbar from '../pages/UserNavbar';

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);
  const [profilePicture, setProfilePicture] = useState(''); // State for profile picture
  const token = localStorage.getItem('token');
  const ApiUrl = "https://eventmanagement-backend-wbgv.onrender.com";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);

        // Get profile image from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.profileImage) {
          setProfilePicture(user.profileImage);
        } else {
          // Optionally set a default image if none exists
          setProfilePicture('https://via.placeholder.com/150'); // Default image URL
        }
      } catch (error) {
        setError(error.response.data.message);
      }
    };
    fetchProfile();
  }, [token]);

  const handleUpdate = () => {
    navigate('/profile/edit');
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProfilePicture(reader.result); // Update profile picture with selected image
  //       // Optionally save new image to localStorage
  //       const user = JSON.parse(localStorage.getItem('user'));
  //       const updatedUser = { ...user, profileImage: reader.result };
  //       localStorage.setItem('user', JSON.stringify(updatedUser));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <>
      <UserNavbar />
      <Container className="mt-5 d-flex justify-content-center">
        <Card style={{ width: '400px' }}>
          <Card.Body>
            <Card.Title className="text-center">User Profile</Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="text-center mb-4" style={{ position: 'relative' }}>
              <img
                src={profilePicture}
                alt="Profile"
                className="rounded-circle"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              {/* <label htmlFor="image-upload" className="edit-icon" style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                <i className="fas fa-edit" style={{ cursor: 'pointer', fontSize: '24px', color: 'blue' }}></i>
                <i class="fa fa-pencil" aria-hidden="true"></i>
              </label>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              /> */}
            </div>
            <div className="mb-3">
              <strong>Name:</strong> {profile.name}
            </div>
            <div className="mb-3">
              <strong>Email:</strong> {profile.email}
            </div>
            <Button variant="primary" onClick={handleUpdate} className="w-100">
              Edit Profile
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default UserProfile;
