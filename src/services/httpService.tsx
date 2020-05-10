import axios from 'axios';
import { getUserToken } from './authService';

export const httpService = () => {
    return axios.create({
        baseURL: 'https://stoic-note-api.herokuapp.com'
    })
}

export const loginUser = (email: string, password: string) => {
    const http = httpService();
    return http.post('/users/login', {email, password});
}

export const registerUser = (user: any) => {
    const http = httpService();
    return http.post('/users', user);
}


export const getAllNotes = () => {
    const http = httpService();
    const token = getUserToken();
    return http.get("/notes", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const getNoteById = (_id: string) => {
    const http = httpService();
    const token = getUserToken();
    return http.get(`/notes/${_id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const updateNoteById = (_id: string, note: any) => {
    const http = httpService();
    const token = getUserToken();
    return http.patch(`/notes/${_id}`, note, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const createNewNote = (note: any) => {
    const http = httpService();
    const token = getUserToken();
    return http.post(`/notes`, note, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}