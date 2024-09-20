import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const CancelTicket = () => {
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.delete('https://eventmanagement-backend-wbgv.onrender.com/api/tickets/cancel', { data: { orderId },})
    .then(() => {
      setMessage('Ticket canceled successfully');
      setError('');
      setOrderId(''); // Reset orderId field after successful cancellation
    })
    .catch(error => {
      setError('Error canceling ticket: ' + error.message);
      setMessage('');
    });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Cancel Ticket</h2>
          
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="orderId">
              <Form.Label>Order ID</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Order ID" 
                value={orderId} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="danger" type="submit" size="lg">
                Cancel Ticket
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CancelTicket;
