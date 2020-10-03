import React, { useState } from 'react';
import { Backdrop, Box, Button, CircularProgress, TextField, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { loginUser } from '../../services/httpService';
import validator from 'validator';
import { setUser } from '../../services/authService';

function LoginPage (props: any) {

    const StyledButton = styled(Button)`
        background-color: ${(props: any) => props.theme.palette.secondary.main};
        width: 100px;
        height: 40px;
        margin-top: 24px;
    `;

    const StyledBackdrop = styled(Backdrop)`
        z-index: 10000;
    `;

    const [email, setEmail] = useState({error: {msg: "", exist: false}, value: ""});
    const [password, setPassword] = useState({error: {msg: "", exist: false}, value: ""});
    const [isLoading, setIsLoading] = useState(false);
    const [authFailed, setAuthFailed] = useState(false);

    const authenticateUser = () => {
        setIsLoading(true);
        setAuthFailed(false);
        let isEmailValid = false, isPasswordValid = false;
        if(!validator.isEmail(email.value)) {
            setEmail({...email, error: {exist: true, msg: "Enter valid Email"}});
        } else {
            setEmail({...email, error: {exist: false, msg: ""}});
            isEmailValid = true;
        }
        if (password.value.length < 8){
            setPassword({...password, error: {exist: true, msg: "Password length cannot be less than 8"}});
        } else {
            setPassword({...password, error: {exist: false, msg: ""}});
            isPasswordValid = true;
        }

        if(isEmailValid && isPasswordValid) {
            loginUser(email.value, password.value).then((response: any) => {
                setUser(response.data);
                props.history.push("/");
            }).catch((err) => {
                setEmail({...email, error: {exist: true, msg: ""}});
                setPassword({...password, error: {exist: true, msg: ""}});
                setAuthFailed(true);
            }).finally(() => {
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }

    }

    // const redirectToSignup = () => {
    //     props.history.replace("/register");
    // }

    return (
        <Box height="inherit" width="inherit" display="flex" flexDirection="column">
            <StyledBackdrop open={isLoading}><CircularProgress color="inherit" /></StyledBackdrop>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flexGrow={4}>
                <Box marginBottom={2}><TextField
                id="outlined-helperText"
                label="Email ID"
                helperText={!email.error.exist ? "Enter your Email ID" : email.error.msg}
                variant="outlined"
                required
                error={email.error.exist}
                value={email.value}
                onKeyUp={(evt) => {if(evt.keyCode === 13) authenticateUser()}}
                onChange={(event) => setEmail({...email, value: event.target.value})}
                /></Box>
                <TextField
                id="outlined-helperText"
                label="Password"
                helperText={!password.error ? "Enter your Password" : password.error.msg}
                variant="outlined"
                type="password"
                required
                error={password.error.exist}
                value={password.value}
                onKeyUp={(evt) => {if(evt.keyCode === 13) authenticateUser()}}
                onChange={(event) => setPassword({...password, value: event.target.value})}
                />
                {authFailed && <Typography variant="caption" color="error">
                        Email Id or Password Incorrect! 
                    </Typography>}
                <StyledButton variant="contained" onClick={authenticateUser}>Login</StyledButton>
            </Box>
        </Box>
    )
}

export default LoginPage;