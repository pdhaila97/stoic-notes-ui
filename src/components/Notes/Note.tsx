import React, { useState, useEffect } from 'react';
import { getNoteById } from '../../services/httpService';
import EditableNote from './EditableNote';

function Note (props: any) {
    const _id = props.match.params.id;
    const [note, setNote]: any = useState();
    useEffect(() => {
        getNoteById(_id).then((response) => {
            setNote(response.data)
        });
    }, [_id]);

    return <EditableNote history={props.history} note={note} isNew={false}/>
}

export default Note;