import React, { useState, useEffect } from 'react';
import { Toolbar, AppBar, Typography, Box, IconButton, Menu, MenuItem, ExpansionPanel as MuiExpansionPanel, ExpansionPanelSummary as MuiExpansionPanelSummary, ExpansionPanelDetails as MuiExpansionPanelDetails } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { clearUser } from '../../services/authService';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import withStyles from '@material-ui/core/styles/withStyles';


const StyledIconButton = styled(IconButton)`
margin-right: auto;
`;

const StyledExitToAppIcon = styled(ExitToAppIcon)`
margin-left: auto;
`;

const ExpansionPanel = withStyles({
    root: {
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiExpansionPanel);
  
  const ExpansionPanelSummary = withStyles({
    root: {
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiExpansionPanelSummary);
  
  const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiExpansionPanelDetails);



interface IMenutItems {
    id: string;
    type: 'folder' | 'resource';
    items?: IMenutItems[];
    label: string;
    clickHandler: Function;
    icon?: any;
}

const renderMenuItems = (items: IMenutItems[]) => {
    return items.map(item => <ExpansionPanel>
                {item.type === 'resource' && <ExpansionPanelDetails onClick={() => item.clickHandler()}>
                    <Typography variant="subtitle2">{item.label}</Typography>
                </ExpansionPanelDetails>}
                {item.type === 'folder' && <>
                <ExpansionPanelSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2">{item.label}</Typography>
                </ExpansionPanelSummary>
                {item.items && item.items.map((item) => <ExpansionPanelDetails onClick={() => item.clickHandler()}>
                    <Typography variant="subtitle2">{item.label}</Typography>
                </ExpansionPanelDetails>)}
                </>}
                {item.icon ? <item.icon /> : null}
            </ExpansionPanel>
        )
}

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

    let menuItems: IMenutItems[] = [
        {
            id: 'sortby',
            label: 'Sort By',
            type: 'folder',
            items: [
                {
                    id: 'title',
                    label: 'Title',
                    type: 'resource',
                    clickHandler: () => props.onSortSelect('title')
                },
                {
                    id: 'incomplete_first',
                    label: 'Incomplete First',
                    type: 'resource',
                    clickHandler: () => props.onSortSelect('meta.isCompleted')
                }
            ],
            clickHandler: () => {}
        },
        {
            id: 'show_archived',
            label: 'Show Archived',
            type: 'resource',
            clickHandler: () => props.onChangeArchive()
        },
        {
            id: 'logout',
            label: 'Logout',
            type: 'resource',
            clickHandler: logout,
            icon: StyledExitToAppIcon
        }
    ];

    useEffect(() => {
        if(!props.onSortSelect) {
            menuItems = menuItems.filter((item) => item.id !== "sortby");
        }
    
        if(!props.showArchiveOpt || props.showArchiveOpt.disabled) {
            menuItems = menuItems.filter((item) => item.id !== "show_archived");
        }
    }, [props.onSortSelect, props.showArchiveOpt]);

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
                    {/* {renderMenuItems(menuItems)} */}
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
                    {(props.showArchiveOpt && !props.showArchiveOpt.disabled) && <MenuItem onClick={props.onChangeArchive}>{props.showArchiveOpt.text}</MenuItem>}
                </Menu>
            </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;