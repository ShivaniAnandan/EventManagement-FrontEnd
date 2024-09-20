import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../pages/AdminNavbar';

const UserListing = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const ApiUrl = "http://localhost:4000";
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) {
                setMessage('No token found, please log in');
                return;
            }

            try {
                const response = await axios.get(`${ApiUrl}/api/admin/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data); // Set the users data to state
            } catch (error) {
                setMessage('Error fetching users');
                console.error('Error fetching users', error);
            }
        };

        fetchUsers();
    }, [token]);

    const handleUserAction = async (userId, action) => {
        try {
            const response = await axios.put(`${ApiUrl}/api/admin/users/${action}`, { userId }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage(response.data.message);
            // Refresh users after action
            const updatedUsers = users.map(user =>
                user._id === userId ? { ...user, isActive: action === 'activate' } : user
            );
            setUsers(updatedUsers);
        } catch (error) {
            setMessage(`Error ${action} user`);
            console.error(`Error ${action} user`, error);
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="container mt-5" >
                <h1 style={{ marginBottom: '30px' }}>User Listing</h1>
                {message && <p className="alert alert-info">{message}</p>}
                <div className="row">
                    {users.map((user, index) => {
                        const imageUrl = `https://randomuser.me/api/portraits/men/${index + 1}.jpg`;
                        return (
                            <div className="col-md-4 mb-4" key={user._id}>
                                <div
                                    className="card"
                                    style={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        padding: '20px', // Increased padding
                                        borderRadius: '10px', // Increased border radius
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Increased shadow
                                    }}
                                >
                                    <img
                                        src={imageUrl}
                                        alt="User Profile"
                                        style={{
                                            width: '120px', // Increased image width
                                            height: '120px', // Increased image height
                                            objectFit: 'cover',
                                            borderRadius: '50%',
                                            marginBottom: '15px' // Increased margin
                                        }}
                                    />
                                    <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <h5 className="card-title" style={{ fontSize: '1.4rem' }}>{user.name}</h5> {/* Increased font size */}
                                        <p className="card-text" style={{ fontSize: '1rem' }}><strong>Email:</strong> {user.email}</p> {/* Increased font size */}
                                        <p className="card-text" style={{ fontSize: '1rem' }}><strong>Status:</strong> {user.isActive ? 'Active' : 'Inactive'}</p> {/* Increased font size */}
                                        <div className="d-flex justify-content-center mt-3">
                                            <button
                                                className="btn btn-success mx-2"
                                                onClick={() => handleUserAction(user._id, 'activate')}
                                                disabled={user.isActive}
                                            >
                                                Activate
                                            </button>
                                            <button
                                                className="btn btn-danger mx-2"
                                                onClick={() => handleUserAction(user._id, 'deactivate')}
                                                disabled={!user.isActive}
                                            >
                                                Deactivate
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default UserListing;
