import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css'; // Import styles
import AdminNavbar from './AdminNavbar';

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
            <div className="admin-dashboard">
                <h1>Admin Dashboard</h1>

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
