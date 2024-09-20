import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AttendeesList = () => {
  const [attendees, setAttendees] = useState([]);
  const { id } = useParams();
  const ApiUrl = "http://localhost:4000";
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${ApiUrl}/api/events/attendees/${id}`, {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in headers
      }
    })
      .then(response => {
        // Filter out duplicates
        const uniqueAttendees = Array.from(
          new Map(response.data.attendees.map(attendee => [`${attendee.name}-${attendee.email}`, attendee])).values()
        );
        setAttendees(uniqueAttendees);
      })
      .catch(error => console.error(error));
  }, [id, token]);

  const downloadCSV = async () => {
    try {
      const response = await axios({
        url: `${ApiUrl}/api/events/export/${id}`,
        method: 'GET',
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}` // Include the token in headers
        }
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'attendees.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error exporting attendees:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Attendees List</h1>
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          {attendees.length === 0 ? (
            <div className="alert alert-info text-center" role="alert">
              No Attendees Found
            </div>
          ) : (
            <ul className="list-group mb-4">
              {attendees.map((attendee, index) => (
                <li key={index} className="list-group-item mb-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="mb-1"><strong>Name:</strong> {attendee.name}</p>
                      <p className="mb-0"><strong>Email:</strong> {attendee.email}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="text-center">
            <button className="btn btn-success" onClick={downloadCSV}>
              Export Attendees
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeesList;
