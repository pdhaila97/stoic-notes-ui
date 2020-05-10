import React, { useState } from "react";
import { Box, Card, TextField, Button, Typography } from "@material-ui/core";
import styled from "styled-components";
import { updateNoteById, createNewNote, deleteNoteById } from "../../services/httpService";
import Header from "../Header";
import { timestampToDate } from "../../services/utilsService";

const StyledCard = styled(Card)`
padding: 8px 16px;
background: ${(props: any) => props.theme.palette.primary.light};
min-height: 200px;
`;

function EditableNote (props: any) {    
    
    const {note} = props;

    const [title, setTitle] = useState({value: note.title, error: false});
    const [description, setDescription] = useState({value: note.description, error: false});

    const StyledButton = styled(Button)`
        background-color: ${(props: any) => props.theme.palette.secondary.main};
        width: 100px;
        height: 40px;
        margin: 8px;
    `;

    const handleSave = () => {
        if(!title.value || title.value.trim() === '') {
            setTitle({...title, error: true});
            return;
        }
        if(!description.value || description.value.trim() === '') {
            setDescription({...description, error: true});
            return;
        }
        if (note._id) {
            updateNoteById(note._id, {title: title.value, description: description.value}).then((response) => {
                props.history.push("/");
            });
        } else {
            createNewNote({title: title.value, description: description.value}).then((response) => {
                props.history.push("/");
            });
        }
    };

    const handleDelete = () => {
        if(note._id) {
            deleteNoteById(note._id).then(() => {
                props.history.push("/");
            })
        }
    }

    return (
        <>
        <Header />
        <Box width="inherit" height="inherit" display="flex" flexDirection="column" alignItems="center">
            <Box width="300px" py={2}>
                <StyledCard>
                    <Box pb={1}>
                        <TextField
                        value={title.value}
                        error={title.error}
                        onChange={(evt) => setTitle({...title, value: evt.target.value})}
                        multiline
                        placeholder={title.value ? "" : "title"}
                        fullWidth
                        />
                    </Box>
                    <Box pb={1}>
                        <TextField
                        value={description.value}
                        error={description.error}
                        onChange={(evt) => setDescription({...description, value: evt.target.value})}
                        multiline
                        placeholder={description.value ? "" : "description"}
                        fullWidth
                        />
                    </Box>
                </StyledCard>
            </Box>
            <Typography variant="caption">Last updated on: {timestampToDate(note.updatedAt)}</Typography>
            <Box display="flex" justifyContent="center">
                <StyledButton variant="contained" onClick={handleSave}>Save</StyledButton>
                {!props.isNew && <StyledButton variant="contained" onClick={handleDelete}>Delete</StyledButton>}
            </Box>
        </Box>
        </>
    )
}

export default EditableNote;