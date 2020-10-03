import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import styled from 'styled-components';
import Backround from '../../images/notes.gif';



const ImageDiv = styled(Box)`
background: url(${Backround});
background-size: cover;
width: 200px;
height: 200px;
`;

const StyledButton = styled(Button)`
    background-color: ${(props: any) => props.theme.palette.secondary.main};
    width: 100px;
    height: 40px;
    margin: 8px;
`;

function LandingPage (props: any) {

    const redirectToLogin = () => {
        props.history.push("/login");
    }

    const redirectToSignup = () => {
        props.history.push("/register");
    }

    return (
        <Box height="inherit" width="inherit" display="flex" flexDirection="column" alignItems="center">
        <ImageDiv mt={16} />
        <Box display="flex" flexDirection="column" justifyContent="center" flexGrow={3}>
            <Box p={3} textAlign="center">
                <Typography variant="h5">Welcome to Stoic Notes!</Typography>
                <Box pt={2}><Typography variant="body1">Please continue to Login/Signup</Typography></Box>
            </Box>
        </Box>
        <Box display="flex" justifyContent="center" flexGrow={1}>
            <StyledButton variant="contained" onClick={redirectToLogin}>Login</StyledButton>
            <StyledButton variant="contained" onClick={redirectToSignup}>Sign Up</StyledButton>
        </Box>
        </Box>
    )
}

export default LandingPage;