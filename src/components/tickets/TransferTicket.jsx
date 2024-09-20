import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

const TransferTicket = () => {
  const [orderId, setOrderId] = useState('');
  const [newUserId, setNewUserId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'orderId') setOrderId(value);
    if (name === 'newUserId') setNewUserId(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('https://eventmanagement-backend-wbgv.onrender.com/api/tickets/transfer', {
      orderId,
      newUserId
    }, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(() => {
      setMessage('Ticket transferred successfully');
      setError('');
      setOrderId('');
      setNewUserId('');
    })
    .catch(error => {
      setError('Error transferring ticket: ' + error.message);
      setMessage('');
    });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Transfer Ticket</h2>
          
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="orderId">
              <Form.Label>Order ID</Form.Label>
              <Form.Control
                type="text"
                name="orderId"
                value={orderId}
                onChange={handleChange}
                placeholder="Enter Order ID"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="newUserId">
              <Form.Label>New User ID</Form.Label>
              <Form.Control
                type="text"
                name="newUserId"
                value={newUserId}
                onChange={handleChange}
                placeholder="Enter New User ID"
                required
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" size="lg">
                Transfer Ticket
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TransferTicket;
