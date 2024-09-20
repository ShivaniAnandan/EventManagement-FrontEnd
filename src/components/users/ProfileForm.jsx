import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import UserNavbar from '../pages/UserNavbar';

const ProfileForm = () => {
  const [profile, setProfile] = useState({ name: '', email: '', role: '' });
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const ApiUrl = "http://localhost:4000";

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

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${ApiUrl}/api/user/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Redirect or show success message (not implemented here)
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
    <UserNavbar/>
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title className="text-center">Update Profile</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
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
            {/* <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={profile.role}
                onChange={handleChange}
              >
                <option value="attendee">Attendee</option>
                <option value="organizer">Organizer</option>
              </Form.Control>
            </Form.Group> */}
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
