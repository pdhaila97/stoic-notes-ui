import React, { useEffect, useState } from 'react';
import { Box, Button } from '@material-ui/core';
import { getAllNotes } from '../../services/httpService';
import NotesList from '../Notes/NotesList';
import styled from 'styled-components';
import Header from '../Header';


const StyledButton = styled(Button)`
    background-color: ${(props: any) => props.theme.palette.secondary.main};
    width: 150px;
    height: 40px;
    margin: 8px;
`;

function DashboardPage (props: any) {   
    const [notes, setNotes] = useState([]);
    const [sortSelected, setSortSelected] = useState({});
    const [showArchive, setShowArchive] = useState(false);
    const [showArchiveOpt, setShowArchiveOpt] = useState({disabled: false, text: "Show Archived"})
    useEffect(() => {
        getAllNotes(sortSelected, showArchive).then(
            (response) => {
                setNotes(response.data);
            }
        )
    }, [sortSelected, showArchive]);

    const addNewNote = () => {
        props.history.push('/note');
    }

    const onSortSelect = (sort: string) => {
        setSortSelected({asc: sort});
    }

    const onChangeArchive = () => {
        setShowArchive(!showArchive);
        setShowArchiveOpt(!showArchive ? {...showArchiveOpt, text: "Hide Archived"} : {...showArchiveOpt, text: "Show Archived"});
    }

    return (
        <>
        <Header onSortSelect={onSortSelect} onChangeArchive={onChangeArchive} showArchiveOpt={showArchiveOpt}/>
        <Box height="inherit" width="inherit" display="flex" flexDirection="column" alignItems="center">
            <Box width="inherit" display="flex" flexDirection="column" pt={2}>
                <NotesList notes={notes} history={props.history}/>
            </Box>
            <StyledButton variant="contained" onClick={addNewNote}>Add new</StyledButton>
        </Box>
        </>
    )
}

export default DashboardPage;