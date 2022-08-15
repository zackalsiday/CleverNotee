export const fetchNoteTag = noteTagId => {
    return $.ajax({
        method: 'Get',
        url:  `api/note_tags/${noteTagId}`
    })
}

export const createNoteTag = noteTag => 
     $.ajax({
        method: 'POST',
        url: 'api/note_tags',
        data: {noteTag}
    })


export const updateNoteTag = noteTag => {
    return $.ajax({
        method: 'PATCH',
        url: `api/note_tags/${noteTag.id}`,
        data: { noteTag }
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