import React, { useState } from 'react';
import { Toolbar, AppBar, Typography, Box, IconButton, Menu, MenuItem, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { clearUser } from '../../services/authService';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';


const StyledIconButton = styled(IconButton)`
margin-right: auto;
`;

const StyledExitToAppIcon = styled(ExitToAppIcon)`
margin-left: auto;
`;
function Header (props: any) {
    const history = useHistory();

    const goBack = () => {
        history.go(-1);
    }

    const logout = () => {
        clearUser();
        history.push("/");
    }

    const handleMenu = (evt: any) => {
        setAnchorEl(evt.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    return (
        <AppBar position="sticky">
            <Toolbar>
                <StyledIconButton edge="start" onClick={goBack}><ArrowBackIcon /></StyledIconButton>
                <Box>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={logout}>Logout<StyledExitToAppIcon /></MenuItem>
                    {/* <ExpansionPanel>
                        <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>Sort By</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography variant="subtitle2">
                                Date Modified
                            </Typography>
                        </ExpansionPanelDetails>
                        <ExpansionPanelDetails>
                            <Typography variant="subtitle2">
                                Incomplete First
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel> */}
                </Menu>
            </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;