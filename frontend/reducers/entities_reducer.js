import { combineReducers } from "redux";

import usersReducer from "./users_reducer";
import NotesReducer from "./notes_reducer";
const entitiesReducer = combineReducers({
    users: usersReducer,
    notes: NotesReducer
});

export default entitiesReducer;