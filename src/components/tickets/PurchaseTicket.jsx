import React, { useState } from 'react';
import { Grid, Button, Typography, Divider } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import '../styles/SeatBooking.css'; // Custom styles
import bookedChair from '../assets/booked-chair.png';
import availableChair from '../assets/available-chair.jpg';

const stripePromise = loadStripe('pk_test_51PyvGlP0TQcdrbfkPZP7y7vVbxZNFZoKusYGXuI9ntX1IE8fy7jYwOnn01VlbjDcCMBUmlgmlyDhOIx0l8rHEcOZ00nGV3x4Al');

// Function to generate seats for a theater layout
const generateSeats = () => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']; // 12 rows
  const seats = [];
  let id = 1;

  rows.forEach((row) => {
    for (let number = 1; number <= 10; number++) {
      seats.push({ id, booked: false, row, number });
      id++;
    }
  });

  return seats;
};

const PurchaseTicket = () => {
  const { state } = useLocation();
  const ticketIdFromEventDetails = state?.ticketId || ''; // Get the ticketId passed from EventDetails
  const [seats, setSeats] = useState(generateSeats());

  const handleSeatClick = (seatId) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === seatId ? { ...seat, booked: !seat.booked } : seat
      )
    );
  };

   // Split seats into sections for the layout
   const topSection = seats.filter((seat) => seat.row >= 'A' && seat.row <= 'C'); // Rows A to C
   const leftSection = seats.filter((seat) => seat.row >= 'D' && seat.row <= 'F'); // Rows D to F
   const bottomSection = seats.filter((seat) => seat.row >= 'G' && seat.row <= 'I'); // Rows G to I
   const rightSection = seats.filter((seat) => seat.row >= 'J' && seat.row <= 'L'); // Rows J to L

  const handleSubmit = async () => {
    const selectedSeats = seats.filter((seat) => seat.booked);
    const quantity = selectedSeats.length;
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id;
    const ticketId = ticketIdFromEventDetails;

    if (quantity === 0) {
      alert("Please select at least one seat!");
      return;
    }

    try {
      const { data } = await axios.post('https://eventmanagement-backend-wbgv.onrender.com/api/tickets/purchase', {
        userId,
        ticketId,
        quantity
      });

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });

      if (error) console.error('Error during payment:', error);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="seat-booking-container">
      <Typography variant="h4" align="center" gutterBottom>
        Select Your Seats
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {/* Left Column (Top and Bottom Sections) */}
        <Grid item xs={6}>
          <Typography variant="h6" align="center">
            A - C
          </Typography>
          <Grid container spacing={1} justifyContent="center" columns={10}>
            {topSection.map((seat) => (
              <Grid item xs={1} key={seat.id}>
                <Tooltip title={`Row ${seat.row}, Seat ${seat.number}`} arrow>
                  <Button
                    onClick={() => handleSeatClick(seat.id)}
                    variant="text"
                    color={seat.booked ? 'error' : 'primary'}
                    style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: seat.booked ? 'transparent' : 'green',
                      padding: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={seat.booked ? bookedChair : availableChair}
                      alt={seat.booked ? 'Booked' : 'Available'}
                      style={{
                        width: '100%',
                        opacity: seat.booked ? 0.5 : 1,
                        filter: seat.booked ? 'grayscale(100%)' : 'none',
                      }}
                    />
                  </Button>
                </Tooltip>
              </Grid>
            ))}
          </Grid>

          <Divider style={{ margin: '20px 0' }} />

          <Typography variant="h6" align="center">
            G - I
          </Typography>
          <Grid container spacing={1} justifyContent="center" columns={10}>
            {bottomSection.map((seat) => (
              <Grid item xs={1} key={seat.id}>
                <Tooltip title={`Row ${seat.row}, Seat ${seat.number}`} arrow>
                  <Button
                    onClick={() => handleSeatClick(seat.id)}
                    variant="text"
                    color={seat.booked ? 'error' : 'primary'}
                    style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: seat.booked ? 'transparent' : 'green',
                      padding: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={seat.booked ? bookedChair : availableChair}
                      alt={seat.booked ? 'Booked' : 'Available'}
                      style={{
                        width: '100%',
                        opacity: seat.booked ? 0.5 : 1,
                        filter: seat.booked ? 'grayscale(100%)' : 'none',
                      }}
                    />
                  </Button>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Column (Left and Right Sections) */}
        <Grid item xs={6}>
          <Typography variant="h6" align="center">
            D - F
          </Typography>
          <Grid container spacing={1} justifyContent="center" columns={10}>
            {leftSection.map((seat) => (
              <Grid item xs={1} key={seat.id}>
                <Tooltip title={`Row ${seat.row}, Seat ${seat.number}`} arrow>
                  <Button
                    onClick={() => handleSeatClick(seat.id)}
                    variant="text"
                    color={seat.booked ? 'error' : 'primary'}
                    style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: seat.booked ? 'transparent' : 'green',
                      padding: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={seat.booked ? bookedChair : availableChair}
                      alt={seat.booked ? 'Booked' : 'Available'}
                      style={{
                        width: '100%',
                        opacity: seat.booked ? 0.5 : 1,
                        filter: seat.booked ? 'grayscale(100%)' : 'none',
                      }}
                    />
                  </Button>
                </Tooltip>
              </Grid>
            ))}
          </Grid>

          <Divider style={{ margin: '20px 0' }} />

          <Typography variant="h6" align="center">
           J - L
          </Typography>
          <Grid container spacing={1} justifyContent="center" columns={10}>
            {rightSection.map((seat) => (
              <Grid item xs={1} key={seat.id}>
                <Tooltip title={`Row ${seat.row}, Seat ${seat.number}`} arrow>
                  <Button
                    onClick={() => handleSeatClick(seat.id)}
                    variant="text"
                    color={seat.booked ? 'error' : 'primary'}
                    style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: seat.booked ? 'transparent' : 'green',
                      padding: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={seat.booked ? bookedChair : availableChair}
                      alt={seat.booked ? 'Booked' : 'Available'}
                      style={{
                        width: '100%',
                        opacity: seat.booked ? 0.5 : 1,
                        filter: seat.booked ? 'grayscale(100%)' : 'none',
                      }}
                    />
                  </Button>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <div className="summary">
        {/* Displaying the total number of selected seats */}
        <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>
          Total Seats Selected: {seats.filter(seat => seat.booked).length}
        </Typography>

        {/* Displaying the seat numbers */}
        <Typography variant="h6" align="center" style={{ marginTop: '10px' }}>
          Selected Seats: {seats.filter(seat => seat.booked).map(seat => seat.row + seat.number).join(', ') || 'None'}
        </Typography>

        {/* Button to confirm booking */}
        <div className="confirm-button-container">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseTicket;
