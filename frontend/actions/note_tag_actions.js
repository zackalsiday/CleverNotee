import * as NoteTagApiUtil from "../util/note_tag_api_util";

export const RECEIVE_NOTE_TAGS = "RECEIVE_NOTE_TAGS";
export const RECEIVE_NOTE_TAG = "RECEIVE_NOTE_TAG";
export const REMOVE_NOTE_TAG = "REMOVE_NOTE_TAG";

const receiveNoteTags = (note_tags) => ({
    type: RECEIVE_NOTE_TAGS,
    note_tags
})

const receiveNoteTag = (note_tag) => ({
    type: RECEIVE_NOTE_TAG,
    note_tag
})

const removeNoteTag = (note_tagId) => ({
    type: REMOVE_NOTE_TAG,
    note_tagId
})

export const fetchNoteTags = () => dispatch => {
    return NoteTagApiUtil.fetchNoteTags()
        .then(noteTags => dispatch(receiveNoteTags(noteTags)))
}

export const fetchNoteTag = (noteTagId) => dispatch => {
    return NoteTagApiUtil.fetchNoteTag(noteTagId)
        .then(noteTag => dispatch(receiveNoteTag(noteTag)))
}

export const createNoteTag = (noteTag) => dispatch => {
    return NoteTagApiUtil.createNoteTag(noteTag)
        .then(noteTag => dispatch(receiveNoteTag(noteTag)))
}

export const updateNoteTag = (noteTag) => dispatch => {
    return NoteTagApiUtil.updateNoteTag(noteTag)
        .then(noteTag => dispatch(receiveNoteTag(noteTag)))
}

// export const deleteNoteTag = (noteTagId) => dispatch => {
//     return NoteTagApiUtil.deleteNoteTag(noteTagId)
//         .then(() => dispatch(removeNoteTag(noteTagId)))
// }