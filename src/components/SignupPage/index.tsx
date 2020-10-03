import React, { useState } from 'react';
import { Box, Button, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { registerUser } from '../../services/httpService';
import validator from 'validator';
import { setUser } from '../../services/authService';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop/Backdrop';


const StyledTextField = styled(TextField)`
margin-bottom: 16px;
width:80%;
max-width: 400px;
`;


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

    const [email, setEmail] = useState({error: { exist: false, msg: "" }, value: ""});
    const [password, setPassword] = useState({error: { exist: false, msg: "" }, value: ""});
    const [password_2, setPassword_2] = useState({error: { exist: false, msg: "" }, value: ""});
    const [age, setAge] = useState({error: { exist: false, msg: "" }, value: ""});
    const [name, setName] = useState({error: { exist: false, msg: "" }, value: ""});
    const [isLoading, setIsLoading] = useState(false);

    const authenticateUser = () => {
        setIsLoading(true);
        let isEmailValid = false, isPasswordValid = false, isPassword_2Valid = false, isNameValid = false, isAgeValid = false;
        if(!validator.isEmail(email.value)) {
            setEmail({...email, error: { exist: true, msg: "Enter valid Email" }});
        } else {
            setEmail({...email, error: { exist: false, msg: "" }});
            isEmailValid = true;
        }
        if (password.value.length < 8){
            setPassword({...password, error: { exist: true, msg: "Password length cannot be less than 8" }});
        } else {
            setPassword({...password, error: { exist: false, msg: "" }});
            isPasswordValid = true;
        }
        if (name.value.trim() === ''){
            setName({...name, error: { exist: true, msg: "Name cannot be left empty" }});
        } else {
            setName({...name, error: { exist: false, msg: "" }});
            isNameValid = true;
        }
        if (Number(age.value) <= 0 || isNaN(Number(age.value))){
            setAge({...age, error: { exist: true, msg: "Invalid Age" }});
        } else {
            setAge({...age, error: { exist: false, msg: "" }});
            isAgeValid = true;
        }
        if (password_2.value !== password.value){
            setPassword_2({...password_2, error: { exist: true, msg: "Passwords do not match!" }});
        } else {
            setPassword_2({...password_2, error: { exist: false, msg: "" }});
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
                setEmail({...email, error: { exist: true, msg: "Email Id Already Exists" }});
            }).finally(() => {
                setIsLoading(false);
            })
        } else {
            setIsLoading(false);
        }

    }

    return (
        <Box height="inherit" width="inherit" display="flex" flexDirection="column">
            <StyledBackdrop open={isLoading}><CircularProgress color="inherit" /></StyledBackdrop>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" flexGrow={4} py={2}>
                <StyledTextField
                id="outlined-helperText"
                label="Name"
                helperText="Enter your Name"
                variant="outlined"
                type="text"
                required
                error={name.error.exist}
                value={name.value}
                onKeyUp={(evt) => {if(evt.keyCode === 13) authenticateUser()}}
                onChange={(event) => setName({...age, value: event.target.value})}
                />
                <StyledTextField
                id="outlined-helperText"
                label="Age"
                helperText={!age.error.exist ? "Enter your Age" : age.error.msg}
                variant="outlined"
                type="number"
                required
                error={age.error.exist}
                value={age.value}
                onKeyUp={(evt) => {if(evt.keyCode === 13) authenticateUser()}}
                onChange={(event) => setAge({...age, value: event.target.value})}
                />
                <StyledTextField
                id="outlined-helperText"
                label="Email ID"
                helperText={!email.error.exist? "Enter your Email ID" : email.error.msg}
                variant="outlined"
                required
                error={email.error.exist}
                value={email.value}
                onKeyUp={(evt) => {if(evt.keyCode === 13) authenticateUser()}}
                onChange={(event) => setEmail({...email, value: event.target.value})}
                />
                <StyledTextField
                id="outlined-helperText"
                label="Password"
                helperText={!password.error.exist? "Enter your Password" : password.error.msg}
                variant="outlined"
                type="password"
                required
                error={password.error.exist}
                value={password.value}
                onKeyUp={(evt) => {if(evt.keyCode === 13) authenticateUser()}}
                onChange={(event) => setPassword({...password, value: event.target.value})}
                />
                <StyledTextField
                id="outlined-helperText"
                label="Re-Enter Password"
                helperText={!password_2.error.exist ? "Re-Enter your Password" : password_2.error.msg}
                variant="outlined"
                type="password"
                required
                error={password_2.error.exist}
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