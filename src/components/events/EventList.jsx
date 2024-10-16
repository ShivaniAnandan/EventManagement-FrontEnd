import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AdminNavbar from '../pages/AdminNavbar';
import UserNavbar from '../pages/UserNavbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/EventListing.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    date: '',
    location: '',
    category: '',
    priceRange: ''
  });
  const [selectedFilters, setSelectedFilters] = useState({
    date: null,
    location: '',
    customLocation: '',
    category: '',
    customCategory: '',
    priceRange: ''
  });
  const [showFilters, setShowFilters] = useState(false); 
  const ApiUrl = "https://eventmanagement-backend-wbgv.onrender.com";
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role;

  useEffect(() => {
    axios.get(`${ApiUrl}/api/events/`, { params: filters })
      .then(response => setEvents(response.data.events))
      .catch(error => console.error("Error fetching events: ", error));
  }, [filters]);

  const handleFilterChange = (filterName, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const applyFilters = () => {
    const { date, location, customLocation, category, customCategory, priceRange } = selectedFilters;
    setFilters({
      date: date ? date.toISOString().split('T')[0] : '',
      location: location === 'Other' ? customLocation : location,
      category: category === 'Other' ? customCategory : category,
      priceRange
    });
  };

  const handleCreateEvent = () => {
    navigate('/events/new');
  };

  const formatTimeTo12Hour = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const suffix = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours}:${minutes < 10 ? `0${minutes}` : minutes} ${suffix}`;
  };

  return (
    <>
      {userRole === 'organizer' ? <AdminNavbar /> : <UserNavbar />}

      <div className="container-fluid">
        <h1 className="my-4">Event List</h1>

        <div className="row">
          {/* Sidebar for Filters */}
          <div className="col-md-3">
            <h4>Filters</h4>
            <div className="filter-section">
              {/* Date Picker */}
              <div className="mb-3">
                <label className="form-label">Select Date:</label>
                <DatePicker
                  selected={selectedFilters.date}
                  onChange={(date) => handleFilterChange('date', date)}
                  dateFormat="yyyy/MM/dd"
                  className="form-control"
                />
              </div>

              {/* Location Dropdown and Custom Input */}
              <div className="mb-3">
                <label className="form-label">Location:</label>
                <select
                  value={selectedFilters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="form-control"
                >
                  <option value="">Select Location</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Other">Other</option>
                </select>
                {selectedFilters.location === 'Other' && (
                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Enter custom location"
                    value={selectedFilters.customLocation}
                    onChange={(e) => handleFilterChange('customLocation', e.target.value)}
                  />
                )}
              </div>

              {/* Category Dropdown and Custom Input */}
              <div className="mb-3">
                <label className="form-label">Category:</label>
                <select
                  value={selectedFilters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="form-control"
                >
                  <option value="">Select Category</option>
                  <option value="Technology">Technology</option>
                  <option value="Music">Music</option>
                  <option value="Health">Health</option>
                  <option value="Business">Business</option>
                  <option value="Other">Other</option>
                </select>
                {selectedFilters.category === 'Other' && (
                  <input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Enter custom category"
                    value={selectedFilters.customCategory}
                    onChange={(e) => handleFilterChange('customCategory', e.target.value)}
                  />
                )}
              </div>

              {/* Price Range Radio Buttons */}
              <div className="mb-3">
                <label className="form-label">Price Range:</label>
                <div>
                  <label className='radio-label'>
                    <input
                      type="radio"
                      name="priceRange"
                      value="0-100"
                      checked={selectedFilters.priceRange === '0-100'}
                      onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                      className='radio'
                    />
                    Under Rs 100
                  </label>
                  <br />
                  <label className='radio-label'>
                    <input
                      type="radio"
                      name="priceRange"
                      value="100-300"
                      checked={selectedFilters.priceRange === '100-300'}
                      onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                      className='radio'
                    />
                    Rs 100 - 300
                  </label>
                  <br />
                  <label className='radio-label'>
                    <input
                      type="radio"
                      name="priceRange"
                      value="300-500"
                      checked={selectedFilters.priceRange === '300-500'}
                      onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                      className='radio'
                    />
                    Above Rs 300
                  </label>
                </div>
              </div>

              {/* Apply Filters Button */}
              <button className="btn btn-primary" onClick={applyFilters}>Apply Filters</button>
            </div>
          </div>

          {/* Event Cards */}
          <div className="col-md-9">
            <div className="row">
              {events.map(event => (
                <div className="col-md-6 col-lg-4 mb-4" key={event._id}>
                  <div className="event-card">
                    <img src={event.image} className="card-img-top" alt={event.title} />
                    <div className="card-body">
                      <h5 className="card-title">{event.title}</h5>
                      {/* <p className="card-text">{event.description}</p> */}
                      <p className="card-text"><strong><small className="text-dark">{new Date(event.date).toLocaleDateString()} at {formatTimeTo12Hour(event.time)}</small></strong></p>
                      <p className="card-text"><strong><small className="text-dark">{event.location}</small></strong></p>
                      <p className="card-text"><strong>Rs {event.price}</strong></p>
                      <div className="d-flex justify-content-center">
                        <Link to={`/events/${event._id}`} className="btn btn-primary">View Details</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          {userRole === 'organizer' && (
            <button className="btn btn-success" onClick={handleCreateEvent}>
              Create Event
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default EventList;
