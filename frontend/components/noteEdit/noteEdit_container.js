import { connect } from 'react-redux';

import NoteEdit from './noteEdit';

import { fetchNote } from '../../actions/note_actions'
import {updateNote} from '../../actions/note_actions'
import { deleteNote } from '../../actions/note_actions';
import { fetchNotebooks } from '../../actions/notebook_actions';
import {fetchNoteTags} from '../../actions/note_tag_actions'
import { fetchNotes } from '../../actions/note_actions';
const mapStateToProps = state => ({
   notebooks: state.entities.notebooks,
   noteTags: state.entities.noteTags,
   notes: state.entities.notes,
    currentUser: state.entities.users[state.session.id]
})

const mapDispatchToProps = dispatch => ({
    fetchNote: (noteId) => (fetchNote(noteId)),
    updateNote: note => dispatch(updateNote(note)),
    deleteNote: noteId => dispatch(deleteNote(noteId)),
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    fetchNoteTags: () => dispatch(fetchNoteTags()),
    fetchNotes: () => dispatch(fetchNotes())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteEdit);