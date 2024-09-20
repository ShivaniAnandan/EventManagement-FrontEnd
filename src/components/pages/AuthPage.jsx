import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthPage.css'; // Move the CSS styles to this file

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Track whether it's Register or Login
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const ApiUrl = "http://localhost:4000";
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
    setDropdownOpen(false);
  };

  const toggleAuthMode = () => {
    setIsSignUp((prevState) => !prevState);
    setSuccessMessage(''); // Clear success message on mode switch
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp ? '/api/auth/register' : '/api/auth/login';

    try {
      const response = await axios.post(`${ApiUrl}${endpoint}`, formData);
      localStorage.setItem('token', response.data.token); // Store JWT token
      localStorage.setItem('user',JSON.stringify(response.data.user)); // store user in localstorage

      if (isSignUp) {
        setSuccessMessage('Registration successful! Please log in.'); // Set success message for registration
        setTimeout(() => {
          navigate('/'); // Redirect to homepage after success message
        }, 2000); // Delay to show success message
      } else {
        const userRole = response.data.user.role; // Assuming the API returns the role on login
        if (userRole === 'organizer') {
          navigate('/admindashboard'); // Redirect to AdminDashboard if Organizer
        } else {
          navigate('/userdashboard'); // Redirect to UserDashboard if Attendee
        }
      }
    } catch (error) {
      console.error('Auth error:', error.response?.data?.message || error.message);
      alert('An error occurred: ' + (error.response?.data?.message || 'Server error')); // Display error message
    }
  };

  // Redirect to Forget Password page
  const handleForgetPassword = () => {
    navigate('/forget-password');
  };

  return (
    <div className={`user-container ${isSignUp ? 'active' : ''}`} id="user-container">
      {/* Register Form */}
      <div className="form-container sign-up">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required={isSignUp} // Name required only for Register
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {/* Role Dropdown with Label */}
          {isSignUp && (
            <div className="form-group custom-dropdown">
              <div className="dropdown" onClick={toggleDropdown}>
                <div className={`dropdown-text ${formData.role === '' ? 'placeholder' : 'Role'}`}>
                  {formData.role || 'Role'}
                </div>
                <ul className={`dropdown-menu ${dropdownOpen ? 'open' : ''}`}>
                  <li onClick={() => handleRoleSelect('attendee')}>attendee</li>
                  <li onClick={() => handleRoleSelect('organizer')}>organizer</li>
                </ul>
              </div>
            </div>
          )}
          <button type="submit">Register</button>
        </form>
      </div>

      {/* Login Form */}
      <div className="form-container sign-in">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <a href="#" onClick={handleForgetPassword}>Forget Your Password?</a>
          <button type="submit">Login</button>
        </form>
      </div>

      {/* Toggle Panel */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of the site's features</p>
            <button className="hidden" id="login" onClick={toggleAuthMode}>Login</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of the site's features</p>
            <button className="hidden" id="register" onClick={toggleAuthMode}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
