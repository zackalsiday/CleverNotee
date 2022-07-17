import {
    RECEIVE_ALL_NOTES,
    RECEIVE_NOTE,
    REMOVE_NOTE,
} from "../actions/note_actions";

const NotesReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_ALL_NOTES:
            nextState = action.notes;
            return nextState;
        case RECEIVE_NOTE:
            nextState[action.note.id] = action.note;
            return nextState;
        case REMOVE_NOTE:
            delete nextState[action.noteId];
            return nextState;
        default:
            return state;
    }
};

export default NotesReducer;