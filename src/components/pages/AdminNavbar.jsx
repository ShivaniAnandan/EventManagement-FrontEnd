import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user'); 
        // Navigate to the /auth page
        navigate('/auth');
    };

     // Get the user name from localStorage or token
  const user = JSON.parse(localStorage.getItem('user')); // Parse the stored user object
  const username = user?.name; // Access the 'name' property
  console.log('User role from localStorage:', username);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
            <Link className="navbar-brand" to="/admindashboard">
                Admin Dashboard
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#adminNavbar"
                aria-controls="adminNavbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div
                className="collapse navbar-collapse"
                id="adminNavbar"
                style={{ justifyContent: 'space-around' }} // Add inline style here
            >
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/events">
                            Events
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/tickets">
                            Tickets
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/users">
                            Users
                        </Link>
                    </li>
                </ul>
                <div className="navbar-text text-light mr-3 d-flex gap-3 align-items-center">
                {username ? `Welcome, ${username}` : 'Welcome'}
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <button
                            className="btn btn-outline-light"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
