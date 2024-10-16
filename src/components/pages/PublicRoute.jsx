import React from 'react';
import { Navigate } from 'react-router-dom';

// PublicRoute component to restrict access to public routes for authenticated users
const PublicRoute = ({isAuthenticated,userrole, children }) => {
  // If user is authenticated, redirect to home
  if (isAuthenticated) {
    if (userrole === 'organizer'){
        return <Navigate to="/admindashboard" replace />;
    }else{
        return <Navigate to="/userdashboard" replace />;
    }
  }

  // Otherwise, render the public content (login/signup)
  return children;
};

export default PublicRoute;
