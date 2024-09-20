import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';

const UserDashboard = () => {
  const [eventData, setEventData] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const ApiUrl = 'https://eventmanagement-backend-wbgv.onrender.com';

  useEffect(() => {
    // Fetch upcoming events
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/api/events/get-events`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEventData(response.data.events);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching events');
      }
    };

    fetchEvents();
  }, [token]);

  return (
    <>
    <UserNavbar />
    <Container fluid>
      {error && <Alert variant="danger">{error}</Alert>}

      <h3 className="mt-4">Upcoming Events</h3>
      <Row>
        {eventData.length > 0 ? (
          eventData.map((event) => (
            <Col md={4} key={event._id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>
                    {event.description}
                  </Card.Text>
                  <Button as={Link} to={`/events/${event._id}`} variant="primary">
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info">No upcoming events</Alert>
          </Col>
        )}
      </Row>
    </Container>
    </>
  );
};

export default UserDashboard;
