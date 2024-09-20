import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EventSchedule = () => {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({
    title: '',
    startTime: '',
    endTime: '',
    speaker: ''
  });
  const { id } = useParams();
  const ApiUrl = "https://eventmanagement-backend-wbgv.onrender.com";
  const token = localStorage.getItem('token');  // Retrieve the token from local storage
  
  useEffect(() => {
    axios.get(`${ApiUrl}/api/events/${id}/schedule`)
      .then(response => setSessions(response.data.sessions))
      .catch(error => console.error(error));
  }, [id]);

  const handleChange = (e) => {
    setNewSession({
      ...newSession,
      [e.target.name]: e.target.value
    });
  };

  const handleAddSession = (e) => {
    e.preventDefault();
    axios.put(`${ApiUrl}/api/events/${id}/schedule`, { sessions: [...sessions, newSession] }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => setSessions([...sessions, newSession]))
      .catch(error => console.error(error));
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(':');
    const hours = parseInt(hour, 10);
    const minutes = parseInt(minute, 10);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHour = hours % 12 || 12; // Convert 0 hour to 12
    return `${formattedHour}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Event Schedule</h1>
      <div className="card shadow-lg p-4 mb-5">
        <h2 className="text-center">Add New Session</h2>
        <form onSubmit={handleAddSession}>
          <div className="form-group mb-3">
            <label htmlFor="title">Session Title</label>
            <input 
              type="text" 
              className="form-control" 
              id="title" 
              name="title" 
              value={newSession.title} 
              onChange={handleChange} 
              placeholder="Session Title" 
              required 
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="startTime">Start Time</label>
            <input 
              type="time" 
              className="form-control" 
              id="startTime" 
              name="startTime" 
              value={newSession.startTime} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="endTime">End Time</label>
            <input 
              type="time" 
              className="form-control" 
              id="endTime" 
              name="endTime" 
              value={newSession.endTime} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="speaker">Speaker</label>
            <input 
              type="text" 
              className="form-control" 
              id="speaker" 
              name="speaker" 
              value={newSession.speaker} 
              onChange={handleChange} 
              placeholder="Speaker Name" 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Add Session</button>
        </form>
      </div>

      <h2 className="text-center mb-4">Current Sessions</h2>
      <div className="row">
        {sessions.length === 0 ? (
          <p className="text-center">No sessions available. Please add a new session.</p>
        ) : (
          sessions.map((session, index) => (
            <div className="col-lg-4 col-md-6 mb-4" key={index}>
              <div className="card h-100">
                <div className="card-body">
                  <h4 className="card-title">{session.title}</h4>
                  <p className="card-text"><strong>Time:</strong> {formatTime(session.startTime)} - {formatTime(session.endTime)}</p>
                  <p className="card-text"><strong>Speaker:</strong> {session.speaker}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventSchedule;
