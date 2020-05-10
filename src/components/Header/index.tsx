import React from 'react';
import { Toolbar, AppBar, Typography, Box, makeStyles, createStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { clearUser } from '../../services/authService';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(() => 
    createStyles({
        spaceAround: {
            justifyContent: "space-around"
        }
    })
);
function Header (props: any) {
    const classes = useStyles();
    const history = useHistory();

    const goBack = () => {
        history.go(-1);
    }

    const logout = () => {
        clearUser();
        history.push("/");
    }
    return (
        <AppBar position="sticky">
            <Toolbar className={classes.spaceAround}>
                <Box onClick={goBack}><ArrowBackIcon /></Box>
                <Box onClick={logout} display="flex"><ExitToAppIcon /> <Typography>(Logout)</Typography></Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;