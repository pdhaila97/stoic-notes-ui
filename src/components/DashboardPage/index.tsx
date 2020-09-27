import React, { useEffect, useState } from 'react';
import { Box, Button } from '@material-ui/core';
import { getAllNotes } from '../../services/httpService';
import NotesList from '../Notes/NotesList';
import styled from 'styled-components';
import Header from '../Header';
import Loader from '../Loader';


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
    const [showArchiveOpt, setShowArchiveOpt] = useState({disabled: false, text: "Show Archived"});
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        getAllNotes(sortSelected, showArchive).then(
            (response) => {
                setNotes(response.data);
                setIsLoading(false);
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
        <Header hideBackArrow={true} onSortSelect={onSortSelect} onChangeArchive={onChangeArchive} showArchiveOpt={showArchiveOpt}/>
        <Box height="inherit" width="inherit" display="flex" flexDirection="column" alignItems="center">
            <StyledButton variant="contained" onClick={addNewNote}>Add new</StyledButton>
            {!isLoading && <Box width="inherit" display="flex" flexDirection="column" pb={2}>
                <NotesList notes={notes} history={props.history}/>
            </Box>}
            {isLoading && <Loader />}
        </Box>
        </>
    )
}

export default DashboardPage;