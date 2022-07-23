import { connect } from 'react-redux';

import NoteEdit from './noteEdit';

import { fetchNote } from '../../actions/note_actions'
import {updateNote} from '../../actions/note_actions'
import { deleteNote } from '../../actions/note_actions';
import { fetchNotebooks } from '../../actions/notebook_actions';

const mapStateToProps = state => ({
   notebooks: state.entities.notebooks
})

const mapDispatchToProps = dispatch => ({
    fetchNote: (noteId) => (fetchNote(noteId)),
    updateNote: note => dispatch(updateNote(note)),
    deleteNote: noteId => dispatch(deleteNote(noteId)),
    fetchNotebooks: () => dispatch(fetchNotebooks())

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteEdit);