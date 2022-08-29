import { connect } from 'react-redux';

import NoteEdit from './noteEdit';
import { fetchNote } from '../../actions/note_actions'
import {updateNote} from '../../actions/note_actions'
import { deleteNote } from '../../actions/note_actions';
import { fetchNotebooks } from '../../actions/notebook_actions';
import {fetchNoteTags} from '../../actions/note_tag_actions'
import { fetchNotes } from '../../actions/note_actions';
import {createNote} from '../../actions/note_actions';
import { fetchNoteTag } from '../../actions/note_tag_actions';
import {updateNoteTag} from '../../actions/note_tag_actions'
import { createNoteTag } from '../../actions/note_tag_actions';
import { deleteNoteTag } from '../../actions/note_tag_actions';
import { fetchTags } from '../../actions/tag_actions';
import { createTag } from '../../actions/tag_actions';
import RichEditor from '../RichEditor/RichEditor';
const mapStateToProps = (state,ownProps) => ({
   notebooks: state.entities.notebooks,
    noteTag: Object.values(state.entities.noteTags).filter(noteTag => noteTag.tag_id.toString() === ownProps.match.params.tag_id).filter(noteTags => noteTags.note_id.toString() === ownProps.match.params.note_id),
    noteTags: Object.values(state.entities.noteTags).filter(noteTag => noteTag.tag_id.toString() === ownProps.match.params.tag_id),
    noteTagsforNotes: Object.values(state.entities.noteTags),
   notes: state.entities.notes,
    currentUser: state.entities.users[state.session.id],
    tags: state.entities.tags,
    ownProps

})

const mapDispatchToProps = dispatch => ({
    fetchNote: (noteId) => (fetchNote(noteId)),
    updateNote: note => dispatch(updateNote(note)),
    deleteNote: noteId => dispatch(deleteNote(noteId)),
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    fetchNoteTags: () => dispatch(fetchNoteTags()),
    fetchNotes: () => dispatch(fetchNotes()),
    createNote: note => (createNote(note)),
    fetchNoteTag: NoteTagId => (fetchNoteTag(NoteTagId)),
    updateNoteTag: NoteTag => dispatch(updateNoteTag(NoteTag)),
    createNoteTag: NoteTag => (createNoteTag(NoteTag)),
    deleteNoteTag: NoteTag => (deleteNoteTag(NoteTag)),
    fetchTags: () => dispatch(fetchTags()),
    createTag: tag => (createTag(tag)),
    random: []
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteEdit);

