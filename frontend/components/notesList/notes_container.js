import { connect } from 'react-redux';

import Note from './note';
import {fetchNotes} from '../../actions/note_actions'
import {fetchNote} from '../../actions/note_actions'
import {fetchNoteTags} from '../../actions/note_tag_actions'
const mapStateToProps = (state) => ({
    currentUser: state.entities.users[state.session.id],
    notes: state.entities.notes,
    noteTags: Object.values(state.entities.noteTags)
});

const mapDispatchToProps = dispatch => ({
fetchNotes: () => dispatch(fetchNotes()),
fetchNote: (noteId) => (fetchNote(noteId)),
fetchNoteTags: () => dispatch(fetchNoteTags())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Note);