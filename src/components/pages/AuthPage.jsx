import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthPage.css'; // Move the CSS styles to this file
import { ClipLoader } from 'react-spinners'; // Importing react-spinners loader

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Track whether it's Register or Login
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [loading, setLoading] = useState(false); // State for loader
  const ApiUrl = "https://eventmanagement-backend-wbgv.onrender.com";
  const navigate = useNavigate();

  // Profile images array
  const profileImages = [
    'https://t3.ftcdn.net/jpg/02/40/30/56/240_F_240305699_X3ky3vcpPRDNBtg1qjmLW7ntzPGU0eGN.jpg',
    'https://t4.ftcdn.net/jpg/05/74/97/67/240_F_574976795_xGCzNlYpDw7wf6gSWFLVaFuTGhOMuaTV.jpg',
    'https://t3.ftcdn.net/jpg/06/01/50/96/240_F_601509638_jDwIDvlnryPRhXPsBeW1nXv90pdlbykC.jpg',
    'https://t4.ftcdn.net/jpg/05/80/60/33/240_F_580603305_ysEbDBvHCKM9TyzEINHyW614NWLdTe0b.jpg',
    'https://t4.ftcdn.net/jpg/05/47/35/41/240_F_547354169_c1lbO3x3Xw5rwr9WThaHUamGSEZI4IsP.jpg',
    'https://t4.ftcdn.net/jpg/07/31/57/43/240_F_731574325_KUHqpDJBMI4T4dIeoMS7GH0zDSQj0VlT.jpg',
    'https://t4.ftcdn.net/jpg/05/59/46/33/240_F_559463395_dBqVnSCQ479taoyYSaohffGOLQiI3x5w.jpg',
    'https://t4.ftcdn.net/jpg/07/57/31/69/240_F_757316903_KiJ2jGy5vQ0dB9ILtjFo6p48UZ7DAoxa.jpg',
    'https://t3.ftcdn.net/jpg/06/21/27/04/240_F_621270406_n7Vx7a5RuRJVmaI1AEltnsfA2SjkOrrr.jpg',
    'https://t4.ftcdn.net/jpg/03/28/94/79/240_F_328947974_26fQsrAPA5cLoL9fSfWZhLM58AQO6rCz.jpg',
  ];

  const getRandomProfileImage = () => {
    const randomIndex = Math.floor(Math.random() * profileImages.length);
    return profileImages[randomIndex];
  };

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
    setLoading(true); // Show loader while processing the request
    const endpoint = isSignUp ? '/api/auth/register' : '/api/auth/login';

    try {
      const response = await axios.post(`${ApiUrl}${endpoint}`, formData);
      localStorage.setItem('token', response.data.token); // Store JWT token
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user in localstorage

      // Add profile image to user object and store in localStorage
      const profileImage = getRandomProfileImage();
      const updatedUser = { ...response.data.user, profileImage };
      localStorage.setItem('user', JSON.stringify(updatedUser));

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
    } finally {
      setLoading(false); // Hide loader after the request is completed
    }
  };

  // Redirect to Forget Password page
  const handleForgetPassword = () => {
    navigate('/forget-password');
  };
  
  // console.log(formData);
  return (
    <div className={`user-container ${isSignUp ? 'active' : ''}`} id="user-container">
       {/* Show loader when loading is true */}
       {loading && (
        <div className="loader">
          <ClipLoader color={'#123abc'} loading={loading} size={50} />
        </div>
       )}
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
                  {formData.role}
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
