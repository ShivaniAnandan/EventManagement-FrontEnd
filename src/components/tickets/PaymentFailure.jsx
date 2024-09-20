import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorOutline } from '@mui/icons-material'; // Material UI error icon
import { Box, Typography } from '@mui/material';

const PaymentFailure = () => {
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
            bgcolor="#ffe6e6"
            p={4}
        >
            <ErrorOutline style={{ fontSize: '4rem', color: 'red' }} />
            <Typography variant="h4" style={{ marginTop: '20px', color: '#f44336' }}>
                Payment Failed
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px', color: '#555' }}>
                An error occurred while processing your payment.
            </Typography>
            <Typography variant="body1" style={{ marginTop: '10px', color: '#555' }}>
                You will be redirected to your dashboard shortly.
            </Typography>
        </Box>
    );
};

export default PaymentFailure;
