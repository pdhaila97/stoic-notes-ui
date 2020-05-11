import React, { useState } from 'react';
import { Card, Typography, Box, FormControlLabel, Checkbox } from '@material-ui/core';
import styled from 'styled-components';

const StyledFormControlLabel = styled(FormControlLabel)`
`;

function NoteListItem (props: any) {
    const {note} = props;
    const StyledCard = styled(Card)`
        padding: 8px 16px;
        margin: 0px 16px;
        background: ${(props: any) => props.theme.palette.primary.light}
    `;
    const [checkState, setCheckState]: any = useState({isArchived: note.meta.isArchived, isCompleted: note.meta.isCompleted});
    const handleCheck = (checkClicked: string) => {
        props.handleCheck(note._id, {meta: {[checkClicked]: !checkState[checkClicked]}}).then((response: any) => {
            setCheckState({...checkState, [checkClicked]:response.data.meta[checkClicked]});
        })
    }

    return (
        <Box width="inherit" py={2}>
            <StyledCard>
                <Box onClick={() => props.handleClick(note._id)}>
                    <Box pb={1}>
                        <Typography variant="subtitle1">{note.title}</Typography>
                    </Box>
                    <Typography variant="caption">{note.description}</Typography>
                </Box>
                <StyledFormControlLabel
                    control={
                    <Checkbox
                        size="small"
                        checked={checkState.isArchived}
                        onChange={() => handleCheck("isArchived")}
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label={<Typography variant="subtitle2">archive</Typography>}
                />
                <StyledFormControlLabel
                    control={
                    <Checkbox
                        size="small"
                        checked={checkState.isCompleted}
                        onChange={() => handleCheck("isCompleted")}
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label={<Typography variant="subtitle2">complete</Typography>}
                />
            </StyledCard>
            
        </Box>
    )
}

export default NoteListItem;