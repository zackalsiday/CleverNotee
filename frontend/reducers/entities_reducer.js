import { combineReducers } from "redux";

import usersReducer from "./users_reducer";
import NotesReducer from "./notes_reducer";
import notebooksReducer from "./notebooks_Reducer";
const entitiesReducer = combineReducers({
    users: usersReducer,
    notes: NotesReducer,
    notebooks: notebooksReducer
});

export default entitiesReducer;