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
                <Box>
                    {!props.hideBackArrow && <StyledIconButton edge="start" onClick={goBack}><ArrowBackIcon /></StyledIconButton>}
                </Box>
                <Box display="flex" justifyContent="flex-end" width={1}>
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
                    {props.onSortSelect && <ExpansionPanel>
                        <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>Sort By</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails onClick={() => props.onSortSelect('title')}>
                            <Typography variant="subtitle2">
                                Title
                            </Typography>
                        </ExpansionPanelDetails>
                        <ExpansionPanelDetails onClick={() => props.onSortSelect('meta.isCompleted')}>
                            <Typography variant="subtitle2">
                                Incomplete First
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>}
                    {(props.showArchiveOpt ? !props.showArchiveOpt.disabled : false) && <MenuItem onClick={props.onChangeArchive}>{props.showArchiveOpt.text}</MenuItem>}
                </Menu>
            </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;