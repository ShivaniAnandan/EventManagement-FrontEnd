import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import UserNavbar from '../pages/UserNavbar';

const PurchasedTickets = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user'))?._id;

    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://eventmanagement-backend-wbgv.onrender.com/api/tickets', {
          params: { userId }
        });
        setOrders(response.data.orders);

        // Check for successful payment
        const orderId = localStorage.getItem('orderId');
        if (orderId) {
          setOrders(prevOrders =>
            prevOrders.map(order =>
              order._id === orderId ? { ...order, paymentStatus: 'success' } : order
            )
          );
          localStorage.removeItem('orderId'); // Clear the orderId from local storage
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleCancel = (ticketId) => {
    navigate(`/cancelticket/${ticketId}`);
  };

  const handleTransfer = (ticketId) => {
    navigate(`/transferticket/${ticketId}`);
  };

  // const handlePayNow = async (orderId) => {
  //   try {
  //     const response = await axios.post('https://eventmanagement-backend-wbgv.onrender.com/api/tickets/webhook', { 
  //       orderId ,
  //       headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  //     });
  //     const { sessionId } = response.data;

  //     // Redirect to Stripe Checkout
  //     window.location.href = sessionId; // Redirect to Stripe Checkout page

  //     // Update the order status to 'success' after returning to the success page
  //     localStorage.setItem('orderId', orderId); // Store the orderId in localStorage
  //   } catch (error) {
  //     console.error('Error processing payment:', error);
  //   }
  // };

  return (
    <>
    <UserNavbar />
    <div className="container mt-4">
      <h2>Purchased Tickets</h2>
      <div className="row">
        {orders.map(order => (
          <div className="col-md-4 mb-3" key={order._id}>
            <Card>
              <Card.Body>
                <Card.Title>{order.ticket.type}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Event: {order.event?.title || 'Unknown Event'}</Card.Subtitle>
                <Card.Text>
                  <div>
                  <p>Quantity: {order.quantity}</p>
                  <p>Total Amount: Rs{order.totalAmount}</p>
                  </div>
                </Card.Text>
                {/* {order.paymentStatus === 'pending' && (
                  <Button variant="success" onClick={() => handlePayNow(order._id)}>Pay Now</Button>
                )} */}
                <Button variant="primary" onClick={() => handleCancel(order._id)} className="mt-2">Cancel</Button>
                <Button variant="secondary" onClick={() => handleTransfer(order._id)} className="ms-2 mt-2">Transfer</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default PurchasedTickets;
