import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserNavbar = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        // Remove token and user name from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user'); 
        // Navigate to the /auth page
        navigate('/auth');
    };

    // Get the user name from localStorage or token
  const user = JSON.parse(localStorage.getItem('user')); // Parse the stored user object
  const username = user?.name; // Access the 'name' property
  


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
            <Link className="navbar-brand" to="/userdashboard">
                User Dashboard
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#userNavbar"
                aria-controls="userNavbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div
                className="collapse navbar-collapse"
                id="userNavbar"
                style={{ justifyContent: 'space-around' }} // Updated for better alignment
            >
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/events">
                            Events
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/purchasedticket">
                            My Tickets
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">
                            Profile
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

export default UserNavbar;
