import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from '@mui/icons-material'; // Material UI icon
import { Box, Typography } from '@mui/material';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to user dashboard after 5 seconds
        const timer = setTimeout(() => {
            navigate('/userdashboard');
        }, 5000);

        // Clean up the timer
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f0f8ff"
            p={4}
        >
            <CheckCircle style={{ fontSize: '4rem', color: 'green' }} />
            <Typography variant="h4" style={{ marginTop: '20px', color: '#4caf50' }}>
                Ticket Purchased Successfully!
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px', color: '#555' }}>
                You will be redirected to your dashboard shortly.
            </Typography>
        </Box>
    );
};

export default PaymentSuccess;
