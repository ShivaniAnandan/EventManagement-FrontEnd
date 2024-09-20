import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Container, Form, Button, Card } from 'react-bootstrap';

const stripePromise = loadStripe('pk_test_51PyvGlP0TQcdrbfkPZP7y7vVbxZNFZoKusYGXuI9ntX1IE8fy7jYwOnn01VlbjDcCMBUmlgmlyDhOIx0l8rHEcOZ00nGV3x4Al');

const PurchaseTicket = () => {
  const [ticket, setTicket] = useState({
    ticketId: '',
    quantity: ''
  });

  const handleChange = (e) => {
    setTicket({
      ...ticket,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { ticketId, quantity } = ticket;

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id;

    try {
      const { data } = await axios.post('http://localhost:4000/api/tickets/purchase', {
        userId,
        ticketId,
        quantity,
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });

      if (error) console.error('Error during payment:', error);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title className="text-center">Purchase Ticket</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="ticketId">
              <Form.Label>Ticket ID</Form.Label>
              <Form.Control 
                type="text" 
                name="ticketId" 
                value={ticket.ticketId} 
                onChange={handleChange} 
                placeholder="Enter Ticket ID" 
                required 
              />
            </Form.Group>
            <Form.Group controlId="quantity" className="mt-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control 
                type="number" 
                name="quantity" 
                value={ticket.quantity} 
                onChange={handleChange} 
                placeholder="Enter Quantity" 
                required 
                min="1" 
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-4 w-100">
              Purchase Ticket
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PurchaseTicket;
