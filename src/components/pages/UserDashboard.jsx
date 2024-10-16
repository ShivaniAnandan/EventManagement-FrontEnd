import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Alert, Button, Carousel } from 'react-bootstrap'; // Import Carousel
import UserNavbar from './UserNavbar';
import '../styles/UserDashboard.css'; // Import custom CSS
import heroImage from '../assets/eventbanner.jpg'; // Hero banner image

// Carousel images (add your image URLs here)
// import carouselImage1 from '../assets/carousel1.jpg';
// import carouselImage2 from '../assets/carousel2.jpg';
// import carouselImage3 from '../assets/carousel3.jpg';
// import carouselImage4 from '../assets/carousel4.jpg';
// import carouselImage5 from '../assets/carousel5.jpg';

const UserDashboard = () => {
  const [eventData, setEventData] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const ApiUrl = 'https://eventmanagement-backend-wbgv.onrender.com';

  useEffect(() => {
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

      {/* Hero Section */}
      <div className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-overlay">
          <h1 className="hero-title">Explore Upcoming Events</h1>
          <p className="hero-subtitle">Find exciting events happening near you and around the world!</p>
        </div>
      </div>

      {/* Carousel Section */}
      {/* <Carousel className="my-4">
        <Carousel.Item>
          <img className="d-block w-100" src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="First slide" />
          <Carousel.Caption>
            <h3>Event 1</h3>
            <p>Description of event 1.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="https://eventbrite-s3.s3.amazonaws.com/marketing/landingpages/assets/2023/organizer/a_organizer_event--creator-eventbrite-.jpeg" alt="Second slide" />
          <Carousel.Caption>
            <h3>Event 2</h3>
            <p>Description of event 2.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="https://media.istockphoto.com/id/479977238/photo/table-setting-for-an-event-party-or-wedding-reception.jpg?s=612x612&w=0&k=20&c=yIKLzW7wMydqmuItTTtUGS5cYTmrRGy0rXk81AltdTA=" alt="Third slide" />
          <Carousel.Caption>
            <h3>Event 3</h3>
            <p>Description of event 3.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaIly_Gkz0I7zbDNeS4sv_RWAgMBA5dD8Thg&s" alt="Fourth slide" />
          <Carousel.Caption>
            <h3>Event 4</h3>
            <p>Description of event 4.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_JTE0V8IDOR3ZaDfUoE6Bfs5DqW836pW3Vg&s"  alt="Fifth slide" />
          <Carousel.Caption>
            <h3>Event 5</h3>
            <p>Description of event 5.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel> */}
        {/* Image Display Section */}
        <div className="image-gallery my-4">
              <div className="image-container">
                <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="image" />
                <img src="https://eventbrite-s3.s3.amazonaws.com/marketing/landingpages/assets/2023/organizer/a_organizer_event--creator-eventbrite-.jpeg"  className='image' />
                <img src="https://media.istockphoto.com/id/479977238/photo/table-setting-for-an-event-party-or-wedding-reception.jpg?s=612x612&w=0&k=20&c=yIKLzW7wMydqmuItTTtUGS5cYTmrRGy0rXk81AltdTA=" className='image' />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaIly_Gkz0I7zbDNeS4sv_RWAgMBA5dD8Thg&s" className='image' />
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_JTE0V8IDOR3ZaDfUoE6Bfs5DqW836pW3Vg&s" className='image' />
              </div>
        </div>

      <Container fluid className="events-container mt-5">
        {error && <Alert variant="danger">{error}</Alert>}

        <h3 className="section-title text-center mb-5">Upcoming Events</h3>
        <Row>
          {eventData.length > 0 ? (
            eventData.map((event) => (
              <Col md={4} key={event._id} className="mb-4">
                <Card className="event-card shadow-sm">
                  <div className="card-image-container">
                    <Card.Img
                      variant="top"
                      src={event.image}
                      alt={event.title}
                      className="card-img-top event-image"
                    />
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="event-title">{event.title}</Card.Title>
                    <Card.Text className="event-description">
                      {event.description.length > 100
                        ? `${event.description.substring(0, 100)}...`
                        : event.description}
                    </Card.Text>
                    <Button
                      as={Link}
                      to={`/events/${event._id}`}
                      variant="primary"
                      className="mt-auto event-button"
                    >
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
