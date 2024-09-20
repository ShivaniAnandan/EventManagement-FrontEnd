import React, { useState } from 'react';
import axios from 'axios';
import icon from '../images/icon.png'; // Import the icon
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ResetPassword.css'; // Create this CSS file to style your page

const ResetPassword = () => {
  const { token } = useParams(); // Extract the token from the URL parameters
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://eventmanagement-backend-wbgv.onrender.com/api/auth/reset-password/${token}`, { newPassword });
      setIsSuccess(true);
      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/auth'); // Redirect to the auth page after success
      }, 2000); // Delay to show the success message
    } catch (error) {
      setIsSuccess(false);
      setMessage(error.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className="reset-password-container">
      <div className="icon-container">
      <img src={icon} alt="Icon" className="icon" />
      </div>
      <h1>Reset Password</h1>
      <p>Enter your New Password</p> {/* Additional text */}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && (
        <p className={`message ${isSuccess ? 'success' : 'error'}`}>{message}</p>
      )}
    </div>
  );
};

export default ResetPassword;
