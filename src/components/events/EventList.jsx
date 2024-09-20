import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AdminNavbar from '../pages/AdminNavbar';
import UserNavbar from '../pages/UserNavbar'; // Import UserNavbar

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    date: '',
    location: '',
    category: '',
    priceRange: ''
  });
  const ApiUrl = "https://eventmanagement-backend-wbgv.onrender.com";
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Get the user role from localStorage or token
  const user = JSON.parse(localStorage.getItem('user')); // Parse the stored user object
  const userRole = user?.role; // Access the 'role' property
  

  useEffect(() => {
    axios.get(`${ApiUrl}/api/events/`, { params: filters })
      .then(response => setEvents(response.data.events))
      .catch(error => console.error(error));
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateEvent = () => {
    navigate('/events/new'); // Navigate to the create event page
  };

  // Helper function to convert 24-hour time format to 12-hour format
  const formatTimeTo12Hour = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const suffix = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12; // Converts '00' to '12' and keeps other numbers as is
    return `${adjustedHours}:${minutes < 10 ? `0${minutes}` : minutes} ${suffix}`;
  };

  return (
    <>
      {/* Conditionally render navbar based on the user's role */}
      {userRole === 'organizer' ? <AdminNavbar /> : <UserNavbar />}

      <div className="container-fluid">
        <h1 className="my-4">Event List</h1>
        <div className="mb-4" style={{ width: '40%', margin: '10px auto' }}>
          <input type="date" className="form-control mb-2" name="date" value={filters.date} onChange={handleFilterChange} />
          <input type="text" className="form-control mb-2" name="location" value={filters.location} onChange={handleFilterChange} placeholder="Location" />
          <input type="text" className="form-control mb-2" name="category" value={filters.category} onChange={handleFilterChange} placeholder="Category" />
          <input type="text" className="form-control mb-2" name="priceRange" value={filters.priceRange} onChange={handleFilterChange} placeholder="Price Range" />
        </div>
        <div className="row">
          {events.map(event => (
            <div className="col-md-6 col-lg-4 mb-4" key={event._id}>
              <div className="card mb-3" style={{ maxWidth: '100%' }}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={event.image} className="img-fluid rounded-start" alt={event.title} style={{ height: '100%' }} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{event.title}</h5>
                      <p className="card-text">{event.description}</p>
                      {/* Use the formatTimeTo12Hour function to display the time in 12-hour format */}
                      <p className="card-text"><small className="text-muted">{event.date} at {formatTimeTo12Hour(event.time)}</small></p>
                      <p className="card-text"><small className="text-muted">{event.location}</small></p>
                      <p className="card-text"><strong>Rs{event.price}</strong></p>
                      <Link to={`/events/${event._id}`} className="btn btn-primary">View Details</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          {/* Show Create Event button only if the user is an admin */}
          {userRole === 'organizer' && (
            <button className="btn btn-success" onClick={handleCreateEvent}>
              Create Event
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default EventList;
