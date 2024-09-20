import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import UserNavbar from '../pages/UserNavbar';

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const ApiUrl = "http://localhost:4000";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
      } catch (error) {
        setError(error.response.data.message);
      }
    };
    fetchProfile();
  }, [token]);

  const handleUpdate = () => {
    navigate('/profile/edit');
  };

  return (
    <>
    <UserNavbar />
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title className="text-center">User Profile</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="mb-3">
            <strong>Name:</strong> {profile.name}
          </div>
          <div className="mb-3">
            <strong>Email:</strong> {profile.email}
          </div>
          <Button variant="primary" onClick={handleUpdate} className="w-100">
            Update Profile
          </Button>
        </Card.Body>
      </Card>
    </Container>
    </>
  );
};

export default UserProfile;
