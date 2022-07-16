import { connect } from 'react-redux';

import Note from './note';
import {fetchNotes} from '../../actions/note_actions'
import {fetchNote} from '../../actions/note_actions'
const mapStateToProps = (state) => ({
    currentUser: state.entities.users[state.session.id],
    notes: state.entities.notes 
});

const mapDispatchToProps = dispatch => ({
fetchNotes: () => fetchNotes(),
fetchNote: (noteId) => (fetchNote(noteId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Note);