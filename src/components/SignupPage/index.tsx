import React, { useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { registerUser } from '../../services/httpService';
import validator from 'validator';
import { setUser } from '../../services/authService';


const StyledTextField = styled(TextField)`
margin-bottom: 12px;
`;


function LoginPage (props: any) {

    const StyledButton = styled(Button)`
        background-color: ${(props: any) => props.theme.palette.secondary.main};
        width: 100px;
        height: 40px;
        margin-top: 24px;
    `;

    const [email, setEmail] = useState({error: false, value: ""});
    const [password, setPassword] = useState({error: false, value: ""});
    const [password_2, setPassword_2] = useState({error: false, value: ""});
    const [age, setAge] = useState({error: false, value: ""});
    const [name, setName] = useState({error: false, value: ""});

    const authenticateUser = () => {
        let isEmailValid = false, isPasswordValid = false, isPassword_2Valid = false, isNameValid = false, isAgeValid = false;
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
        if (name.value.trim() === ''){
            setName({...name, error: true});
        } else {
            setName({...name, error: false});
            isNameValid = true;
        }
        if (Number(age.value) <= 0 || isNaN(Number(age.value))){
            setAge({...age, error: true});
        } else {
            setAge({...age, error: false});
            isAgeValid = true;
        }
        if (password_2.value !== password.value){
            setPassword_2({...password_2, error: true});
        } else {
            setPassword_2({...password_2, error: false});
            isPassword_2Valid = true;
        }

        if(isEmailValid && isPasswordValid && isAgeValid && isNameValid && isPassword_2Valid) {
            const user = {
                name: name.value,
                age: age.value,
                email: email.value,
                password: password.value
            }
            registerUser(user).then((response: any) => {
                setUser(response.data);
                props.history.push("/");
            }).catch((err) => {
                setEmail({...email, error: true});
                setPassword({...password, error: true});
            })
        }

    }

    return (
        <Box height="inherit" width="inherit" display="flex" flexDirection="column">
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flexGrow={4}>
                <StyledTextField
                id="outlined-helperText"
                label="Name"
                helperText="Enter your Name"
                variant="outlined"
                type="text"
                required
                error={name.error}
                value={name.value}
                onKeyUp={(evt) => {if(evt.keyCode === 13) authenticateUser()}}
                onChange={(event) => setName({...age, value: event.target.value})}
                />
                <StyledTextField
                id="outlined-helperText"
                label="Age"
                helperText={!age.error ? "Enter your Age" : "Age cannot be less than 0!"}
                variant="outlined"
                type="number"
                required
                error={age.error}
                value={age.value}
                onKeyUp={(evt) => {if(evt.keyCode === 13) authenticateUser()}}
                onChange={(event) => setAge({...age, value: event.target.value})}
                />
                <StyledTextField
                id="outlined-helperText"
                label="Email ID"
                helperText={!email.error ? "Enter your Email ID" : "Enter valid Email"}
                variant="outlined"
                required
                error={email.error}
                value={email.value}
                onKeyUp={(evt) => {if(evt.keyCode === 13) authenticateUser()}}
                onChange={(event) => setEmail({...email, value: event.target.value})}
                />
                <StyledTextField
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
                <StyledTextField
                id="outlined-helperText"
                label="Re-Enter Password"
                helperText={!password_2.error ? "Re-Enter your Password" : "Passwords do not match!"}
                variant="outlined"
                type="password"
                required
                error={password_2.error}
                value={password_2.value}
                onKeyUp={(evt) => {if(evt.keyCode === 13) authenticateUser()}}
                onChange={(event) => setPassword_2({...password_2, value: event.target.value})}
                />
                <StyledButton variant="contained" onClick={authenticateUser}>Sign Up</StyledButton>
            </Box>
        </Box>
    )
}

export default LoginPage;