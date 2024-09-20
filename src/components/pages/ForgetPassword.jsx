import React, { useState } from 'react';
import axios from 'axios';
import icon from '../images/icon.png'; // Import the icon
import '../styles/ForgetPassword.css'; // Link to the CSS file for styling

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const ApiUrl = "http://localhost:4000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${ApiUrl}/api/auth/forget-password`, { email });
      setIsSuccess(true);
      setMessage(response.data.message);
    } catch (error) {
      setIsSuccess(false);
      setMessage(error.response?.data?.message || 'Failed to send password reset email');
    }
  };

  return (
    <div className="forget-password-page">
      {/* Add the icon at the top */}
     
      <div className="forget-password-container">
      <div className="icon-container">
        <img src={icon} alt="Icon" className="icon" />
      </div>

        <h1>Forget Password</h1>
        <p>Enter your Email to send reset link</p> {/* Additional text */}
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>

        {message && (
          <p className={`message ${isSuccess ? 'success' : 'error'}`}>{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
