import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css'; // Import styles
import AdminNavbar from './AdminNavbar';
import heroImage from '../assets/eventbanner.jpg'; // Hero banner image

const AdminDashboard = () => {
    const [events, setEvents] = useState([]);
    const [message, setMessage] = useState('');

    // Fetch all events
    const fetchEvents = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('No token found, please log in');
            return;
        }

        try {
            const response = await axios.get('https://eventmanagement-backend-wbgv.onrender.com/api/admin/events', {
                headers: {
                    Authorization: `Bearer ${token}` // Include token in the request header
                }
            });
            setEvents(response.data); // Make sure to set the events data to state
        } catch (error) {
            setMessage('Error fetching events');
            console.error('Error fetching events', error);
        }
    };

    // Approve or reject event
    const handleEventApproval = async (eventId, approve) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(
                'https://eventmanagement-backend-wbgv.onrender.com/api/admin/events/approve',
                { eventId, approve }, // Request body
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Include token in the request header
                    }
                }
            );
            setMessage(response.data.message);
            fetchEvents(); // Refresh events after approval
        } catch (error) {
            setMessage('Error updating event approval status');
            console.error('Error:', error);
        }
    };



    useEffect(() => {
        fetchEvents();

    }, []);

    return (
        <div className="admin-container">
            <AdminNavbar />
            {/* Hero Section */}
            <div className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
                <div className="hero-overlay">
                    <h1 className="hero-title">Explore Upcoming Events</h1>
                    <p className="hero-subtitle">Find exciting events happening near you and around the world!</p>
                </div>
            </div>
            {/* Image Display Section */}
            <div className="image-gallery my-4">
                <div className="image-container">
                    <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="image" />
                    <img src="https://eventbrite-s3.s3.amazonaws.com/marketing/landingpages/assets/2023/organizer/a_organizer_event--creator-eventbrite-.jpeg" className='image' />
                    <img src="https://media.istockphoto.com/id/479977238/photo/table-setting-for-an-event-party-or-wedding-reception.jpg?s=612x612&w=0&k=20&c=yIKLzW7wMydqmuItTTtUGS5cYTmrRGy0rXk81AltdTA=" className='image' />
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaIly_Gkz0I7zbDNeS4sv_RWAgMBA5dD8Thg&s" className='image' />
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_JTE0V8IDOR3ZaDfUoE6Bfs5DqW836pW3Vg&s" className='image' />
                </div>
            </div>
            <div className="admin-dashboard">
                {message && <p className="message">{message}</p>}

                <div className="dashboard-section">
                    <h2>Event Management</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Event Image</th>
                                <th>Event Name</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event._id}>
                                    <td><img src={event.image} alt="eventimg" className='eventimg' /></td>
                                    <td>{event.title}</td>
                                    <td>{new Date(event.date).toLocaleDateString()}</td>
                                    <td>{event.isApproved ? 'Approved' : 'Pending'}</td>
                                    <td>
                                        <button
                                            onClick={() => handleEventApproval(event._id, true)}
                                            className="approve-btn"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleEventApproval(event._id, false)}
                                            className="reject-btn"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    );
};

export default AdminDashboard;
