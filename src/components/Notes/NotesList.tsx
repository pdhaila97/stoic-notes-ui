import React from 'react';
import NoteListItem from './NoteListItem';
import { Box, Typography } from '@material-ui/core';
import { updateNoteById } from '../../services/httpService';

function NotesList (props: any) {

    const handleClick = (_id: string) => {
        props.history.push(`/note/${_id}`)
    }

    const handleCheck = (_id: string, note: any) => {
        return updateNoteById(_id, note);
    }


    return (
        <Box width="inherit" display="flex" flexDirection="column" alignItems="center">
        {(!props.notes || props.notes.length <= 0) && <Typography>Start Creating Notes!</Typography>}
        {props.notes && props.notes.length > 0 && props.notes.map(
            (note: any) => {
                return (
                    <NoteListItem handleCheck={handleCheck} note={note} handleClick={handleClick} key={note._id}/>
                )
            }
        )}
        </Box>
    )
}

export default NotesList;