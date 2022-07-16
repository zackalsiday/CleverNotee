import { connect } from 'react-redux';

import NoteEdit from './noteEdit';

import { fetchNote } from '../../actions/note_actions'
import {updateNote} from '../../actions/note_actions'
// const mapStateToProps = (state, ownProps) => ({
//     // currentNote: dispatch(fetchNote(ownProps.match.params.id)) 
// })

const mapDispatchToProps = dispatch => ({
    fetchNote: (noteId) => (fetchNote(noteId)),
    updateNote: note => dispatch(updateNote(note))
});

export default connect(
    null,
    mapDispatchToProps
)(NoteEdit);