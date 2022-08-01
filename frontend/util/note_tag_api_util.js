export const fetchNoteTag = noteTagId => {
    return $.ajax({
        method: 'Get',
        url:  `api/note_tags/${noteTagId}`
    })
}

export const createNoteTag = noteTag => {
    return $.ajax({
        method: 'POST',
        url: 'api/note_tags',
        data: {noteTag}
    })
}

export const updateNoteTag = note_tag => {
    return $.ajax({
        method: 'PATCH',
        url: `api/note_tags/${note_tag.id}`,
        data: { note_tag }
    })
}

export const fetchNoteTags = () => {
    return $.ajax({
        method: 'GET',
        url: 'api/note_tags'
    })
}

export const deleteNoteTag = note_tagId => {
    return $.ajax({
        method: 'DELETE',
        url: `api/note_tags/${note_tagId}`
    })
}