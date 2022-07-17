

import * as NotesApiUtil from "../util/notes_api_util";

export const RECEIVE_ALL_NOTES = "RECEIVE_ALL_NOTES";
export const RECEIVE_NOTE = "RECEIVE_NOTE";
export const REMOVE_NOTE = "REMOVE_NOTE";


const receiveAllNotes = (notes) => ({
    type: RECEIVE_ALL_NOTES,
    notes,
});

const receiveNote = (note) => ({
    type: RECEIVE_NOTE,
    note,
});

const removeNote = (noteId) => ({
    type: REMOVE_NOTE,
    noteId,
});




export const fetchNotes = () => (dispatch) =>
    NotesApiUtil.fetchNotes().then((notes) => dispatch(receiveAllNotes(notes)));


export const fetchNote = (noteId) => (dispatch) =>
    NotesApiUtil.fetchNote(noteId).then((note) => dispatch(receiveNote(note)));


export const createNote = (note) => (dispatch) =>
    NotesApiUtil.createNote(note).then(
        (note) => dispatch(receiveNote(note)),
    );

export const updateNote = (note) => (dispatch) =>
    NotesApiUtil.updateNote(note).then(
        (note) => dispatch(receiveNote(note))
    );

export const deleteNote = (noteId) => (dispatch) =>
    NotesApiUtil.deleteNote(noteId).then(
        () => dispatch(removeNote(noteId))
    );