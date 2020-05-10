import React, { useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
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

    const [email, setEmail] = useState({error: false, value: ""});
    const [password, setPassword] = useState({error: false, value: ""});

    const authenticateUser = () => {
        let isEmailValid = false, isPasswordValid = false;
        if(!validator.isEmail(email.value)) {
            setEmail({...email, error: true});
        } else {
            setEmail({...email, error: false});
            isEmailValid = true;
        }
        if (password.value.length < 8){
            setPassword({...password, error: true});
        } else {
            setPassword({...password, error: false});
            isPasswordValid = true;
        }

        if(isEmailValid && isPasswordValid) {
            loginUser(email.value, password.value).then((response: any) => {
                setUser(response.data);
                props.history.push("/");
            }).catch((err) => {
                setEmail({...email, error: true});
                setPassword({...password, error: true});
            })
        }

    }

    // const redirectToSignup = () => {
    //     props.history.replace("/register");
    // }

    return (
        <Box height="inherit" width="inherit" display="flex" flexDirection="column">
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flexGrow={4}>
                <Box marginBottom={2}><TextField
                id="outlined-helperText"
                label="Email ID"
                helperText={!email.error ? "Enter your Email ID" : "Enter valid Email"}
                variant="outlined"
                required
                error={email.error}
                value={email.value}
                onKeyUp={(evt) => {if(evt.keyCode === 13) authenticateUser()}}
                onChange={(event) => setEmail({...email, value: event.target.value})}
                /></Box>
                <TextField
                id="outlined-helperText"
                label="Password"
                helperText={!password.error ? "Enter your Password" : "Password length cannot be less than 8"}
                variant="outlined"
                type="password"
                required
                error={password.error}
                value={password.value}
                onKeyUp={(evt) => {if(evt.keyCode === 13) authenticateUser()}}
                onChange={(event) => setPassword({...password, value: event.target.value})}
                />
                <StyledButton variant="contained" onClick={authenticateUser}>Login</StyledButton>
            </Box>
        </Box>
    )
}

export default LoginPage;