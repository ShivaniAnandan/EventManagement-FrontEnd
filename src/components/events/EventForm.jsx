import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EventForm = () => {
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    price: '',
    image: '',
    sessions: []
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const ApiUrl = "https://eventmanagement-backend-wbgv.onrender.com";

  // Retrieve the token from local storage or context
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (id) {
      axios.get(`${ApiUrl}/api/events/${id}`)
        .then(response => {
          const eventData = response.data.event;

          let formattedDate = '';
          let formattedTime = '';

          // Validate and format date
          if (eventData.date && !isNaN(new Date(eventData.date))) {
            formattedDate = new Date(eventData.date).toISOString().split('T')[0];
          } else {
            console.error('Invalid date value');
          }

          // Validate and format time to 12-hour format with AM/PM
          if (eventData.time) {
            const [hour, minutes] = eventData.time.split(':');
            const isPM = hour >= 12;
            const adjustedHour = hour % 12 || 12; // Convert to 12-hour format
            formattedTime = `${adjustedHour}:${minutes} ${isPM ? 'PM' : 'AM'}`;
          } else {
            console.error('Invalid time format');
          }

          setEvent({
            ...eventData,
            date: formattedDate,
            time: formattedTime
          });

          setIsUpdate(true);
        })
        .catch(error => console.error(error));
    }
  }, [id]);

  // Handle form input changes, including converting 12-hour time back to 24-hour format
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the input is time, convert it back to 24-hour format
    if (name === 'time') {
      const [time, modifier] = value.split(' ');
      let [hours, minutes] = time.split(':');

      if (modifier === 'PM' && hours !== '12') {
        hours = parseInt(hours, 10) + 12;
      }
      if (modifier === 'AM' && hours === '12') {
        hours = '00';
      }

      const formattedTime = `${hours}:${minutes}`;
      setEvent({
        ...event,
        time: formattedTime // Store in 24-hour format
      });
    } else {
      setEvent({
        ...event,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isUpdate ? `${ApiUrl}/api/events/${id}` : `${ApiUrl}/api/events`;
    const method = isUpdate ? 'put' : 'post';

    axios({
      method,
      url,
      data: event,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(() => navigate('/events'))
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={event.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={event.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        type="date"
        name="date"
        value={event.date}
        onChange={handleChange}
        required
      />
      {/* Time input in 12-hour format */}
      <input
        type="text"
        name="time"
        value={event.time}
        onChange={handleChange}
        placeholder="HH:MM AM/PM"
        required
      />
      <input
        type="text"
        name="location"
        value={event.location}
        onChange={handleChange}
        placeholder="Location"
        required
      />
      <input
        type="text"
        name="category"
        value={event.category}
        onChange={handleChange}
        placeholder="Category"
        required
      />
      <input
        type="number"
        name="price"
        value={event.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="text"
        name="image"
        value={event.image}
        onChange={handleChange}
        placeholder="Image URL"
        required
      />
      <button type="submit">
        {isUpdate ? 'Update Event' : 'Create Event'}
      </button>
    </form>
  );
};

export default EventForm;
