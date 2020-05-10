import React from 'react';
import { Card, Typography, Box } from '@material-ui/core';
import styled from 'styled-components';

function NoteListItem (props: any) {
    const {note} = props;
    const StyledCard = styled(Card)`
        padding: 8px 16px;
        background: ${(props: any) => props.theme.palette.primary.light}
    `;
    return (
        <Box width="300px" py={2} onClick={() => props.handleClick(note._id)}>
            <StyledCard>
                <Box pb={1}>
                    <Typography variant="subtitle1">{note.title}</Typography>
                </Box>
                <Typography variant="caption">{note.description}</Typography>
            </StyledCard>
        </Box>
    )
}

export default NoteListItem;