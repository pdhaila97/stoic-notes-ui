import React from 'react';
import NoteListItem from './NoteListItem';
import { Box, Typography } from '@material-ui/core';

function NotesList (props: any) {

    const handleClick = (_id: string) => {
        props.history.push(`/note/${_id}`)
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
        {(!props.notes || props.notes.length <= 0) && <Typography>Start Creating Notes!</Typography>}
        {props.notes && props.notes.length > 0 && props.notes.map(
            (note: any) => {
                return (
                    <NoteListItem note={note} handleClick={handleClick} key={note._id}/>
                )
            }
        )}
        </Box>
    )
}

export default NotesList;