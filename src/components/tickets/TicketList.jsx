import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from '../pages/AdminNavbar';

const TicketListing = () => {
  const [tickets, setTickets] = useState([]);
  const ApiUrl = "http://localhost:4000";

  useEffect(() => {
    axios.get(`${ApiUrl}/api/tickets/get-tickets`)
    .then(response => {
      setTickets(response.data.tickets);  // Assuming the response contains a 'tickets' array
    })
    .catch(error => console.error('Error fetching tickets:', error));
  }, []);

  return (
    <>
    <AdminNavbar />
    <div className="container mt-4">
      <h1 className="mb-4">Tickets</h1>
      <div className="row">
        {tickets.length > 0 ? (
          tickets.map(ticket => (
            <div className="col-md-4 mb-4" key={ticket._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Ticket:{ticket._id}</h5>
                  <h5 className="card-title">Event: {ticket.event}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Type: {ticket.type}</h6>
                  <p className="card-text">Price: ${ticket.price}</p>
                  <p className="card-text">Available Quantity: {ticket.availableQuantity}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No tickets available.</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default TicketListing;
