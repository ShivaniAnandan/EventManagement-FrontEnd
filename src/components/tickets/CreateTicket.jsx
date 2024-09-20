import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTicket = () => {
  const [ticket, setTicket] = useState({
    event: '',
    type: 'General Admission',
    price: '',
    availableQuantity: ''
  });
  const navigate = useNavigate();  // Initialize useNavigate

  const handleChange = (e) => {
    setTicket({
      ...ticket,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/api/tickets', ticket, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      alert('Ticket created successfully');
      navigate('/tickets');  // Navigate to the Ticket Listing page after success
    })
    .catch(error => console.error('Error creating ticket:', error));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Create New Ticket</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="event">Event ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="event"
                  name="event"
                  value={ticket.event}
                  onChange={handleChange}
                  placeholder="Enter Event ID"
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="type">Ticket Type</label>
                <select
                  className="form-control"
                  id="type"
                  name="type"
                  value={ticket.type}
                  onChange={handleChange}
                >
                  <option value="General Admission">General Admission</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={ticket.price}
                  onChange={handleChange}
                  placeholder="Enter Price"
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="availableQuantity">Available Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  id="availableQuantity"
                  name="availableQuantity"
                  value={ticket.availableQuantity}
                  onChange={handleChange}
                  placeholder="Enter Available Quantity"
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-block">Create Ticket</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
