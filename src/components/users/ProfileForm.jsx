import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import UserNavbar from '../pages/UserNavbar';
import {  useNavigate } from 'react-router-dom';
import { Box, Avatar, IconButton} from '@mui/material';
import { Edit } from '@mui/icons-material';

const ProfileForm = () => {
  const [profile, setProfile] = useState({ name: '', email: '', role: '' });
  const [error, setError] = useState(null);
  const [profilePicture, setProfilePicture] = useState(''); // State for profile picture
  const [success, setSuccess] = useState(null); // State for success message
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

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Update profile picture with selected image
        // Optionally save new image to localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        const updatedUser = { ...user, profileImage: reader.result };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${ApiUrl}/api/user/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Profile updated successfully!'); // Set success message
      setTimeout(() => {
        navigate('/profile'); // Navigate after 2 seconds
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <UserNavbar />
      <Container className="mt-5 d-flex justify-content-center">
        <Card style={{ width: '400px' }}>
          <Card.Body>
            <Card.Title className="text-center">Edit Profile</Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>} {/* Display success message */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3, position: 'relative' }}>
          <Avatar src={profilePicture} sx={{ width: 120, height: 120 }} />
          <IconButton
            component="label"
            sx={{
              position: 'absolute',
              bottom: 0,
              right: '25%',
              backgroundColor: 'white',
              '&:hover': { backgroundColor: 'gray' },
            }}
          >
            <Edit />
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </IconButton>
        </Box>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ProfileForm;
