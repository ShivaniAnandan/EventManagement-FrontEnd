import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EventAnalytics = () => {
  const [analytics, setAnalytics] = useState({});
  const { id } = useParams();
  const ApiUrl = "https://eventmanagement-backend-wbgv.onrender.com";
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${ApiUrl}/api/events/analytics/${id}`, {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in headers
      }
    })
      .then(response => setAnalytics(response.data.analyticsData))
      .catch(error => console.error(error));
  }, [id, token]);

  // Data for the chart
  const data = [
    { name: 'Tickets Sold', value: analytics.totalTicketsSold },
    { name: 'Attendance', value: analytics.totalAttendance },
    { name: 'Revenue (in Rs)', value: analytics.totalRevenue },
  ];

  return (
    <div className="container mt-5 px-3 px-lg-5">
      <h1 className="text-center mb-5 display-4">Event Analytics</h1>

      <div className="card shadow-sm mb-5 p-3 bg-white rounded">
        <div className="card-body text-center">
          <h2 className="mb-4 text-primary">{analytics.eventTitle}</h2>
          <p className="mb-1"><strong>Date:</strong> {new Date(analytics.eventDate).toLocaleDateString()}</p>
          <p className="mb-1"><strong>Location:</strong> {analytics.eventLocation}</p>
        </div>
      </div>

      <div className="row">
        {/* Key Metrics */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm bg-light rounded p-4">
            <div className="card-body">
              <h4 className="text-secondary mb-3">Key Metrics</h4>
              <p className="mb-2"><strong>Total Tickets Sold:</strong> {analytics.totalTicketsSold}</p>
              <p className="mb-2"><strong>Total Attendance:</strong> {analytics.totalAttendance}</p>
              <p className="mb-0"><strong>Total Revenue:</strong> Rs {analytics.totalRevenue}</p>
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="col-lg-6 mb-4">
          <div className="card shadow-sm bg-white rounded p-4">
            <div className="card-body">
              <h4 className="text-secondary mb-3">Performance Overview</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventAnalytics;
