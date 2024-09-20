import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const EventDetails = () => {
  const [event, setEvent] = useState({});
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [userError, setUserError] = useState(''); // State for user error message
  const { id } = useParams();
  const navigate = useNavigate();
  const ApiUrl = "http://localhost:4000";
  const token = localStorage.getItem('token');

  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role;
  const userStatus = user?.isActive; // Assuming user has an `isActive` field

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/api/events/${id}`);
        setEvent(response.data.event);
        if (!response.data.event.isApproved) {
          setErrorMessage('This event is rejected, so you cannot create a ticket or book a ticket.'); // Set error message
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchTickets = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/api/tickets/get-tickets`)
        const eventTickets = response.data.tickets.filter(ticket => ticket.event === id);
        setTickets(eventTickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
    fetchTickets();
  }, [id, token]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${ApiUrl}/api/events/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      navigate('/events');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleBookTicket = () => {
    if (!userStatus) {
      setUserError('Your account is deactivated, so you cannot book a ticket.'); // Set user error message
    } else {
      navigate(`/purchaseticket`);
    }
  };

  const formatTimeTo12Hour = (time) => {
    if (!time) return ''; // Return an empty string if time is undefined

    const [hours, minutes] = time.split(':').map(Number);
    const suffix = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours}:${minutes < 10 ? `0${minutes}` : minutes} ${suffix}`;
  };

  return (
    <div className="container mt-5">
      <div style={{
        backgroundColor: '#f8f9fa',
        marginTop: '20px',
        padding: '1.5rem',
        borderRadius: '0.25rem',
        boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.15)'
      }}>
        <div className="row">
          <div className="col-md-4 mb-4 d-flex justify-content-center">
            <img src={event.image} alt={event.title} className="img-fluid rounded" style={{ maxHeight: '300px', objectFit: 'cover' }} />
          </div>

          <div className="col-md-8">
            <h1>{event.title}</h1>
            <p className="lead">{event.description}</p>
            <p><strong>Date:</strong> {event.date} at {formatTimeTo12Hour(event.time)}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Price:</strong> Rs{event.price}</p>

            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            {userError && (
              <div className="alert alert-danger" role="alert">
                {userError}
              </div>
            )}

            <div className="mb-3">
              {userRole === 'organizer' ? (
                <>
                  <Link to={`/events/${id}/schedule`} className="btn btn-primary me-2">View Schedule</Link>
                  <Link to={`/events/${id}/analytics`} className="btn btn-info me-2">View Analytics</Link>
                  <Link to={`/events/${id}/attendees`} className="btn btn-success me-2">View Attendees</Link>
                  <button 
                    onClick={() => navigate('/createticket')} 
                    className="btn btn-warning me-2" 
                    disabled={!event.isApproved}
                  >
                    Create Ticket
                  </button>
                  <button onClick={handleDelete} className="btn btn-danger">Delete Event</button>
                </>
              ) : (
                <button 
                  onClick={handleBookTicket} 
                  className={`btn ${event.isApproved ? 'btn-primary' : 'btn-secondary'}`} 
                  disabled={!event.isApproved}
                >
                  {event.isApproved ? 'Book a Ticket' : 'Tickets Unavailable'}
                </button>
              )}
            </div>
            
            {userRole !== 'organizer' && (
              <div className="mt-4">
                <h2>Available Tickets</h2>
                {loading ? (
                  <p>Loading tickets...</p>
                ) : tickets.length > 0 ? (
                  <div className="row">
                    {tickets.map(ticket => (
                      <div className="col-md-4 mb-4" key={ticket._id}>
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title">Ticket ID: {ticket._id}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Type: {ticket.type}</h6>
                            <p className="card-text">Price: ${ticket.price}</p>
                            <p className="card-text">Available Quantity: {ticket.availableQuantity}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No tickets available for this event.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
