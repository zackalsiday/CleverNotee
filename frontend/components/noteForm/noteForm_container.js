import { connect } from 'react-redux';

import NoteForm from './noteForm';
import { createNote } from '../../actions/note_actions'
const mapStateToProps = (state) => ({
    currentUser: state.entities.users[state.session.id],
});

const mapDispatchToProps = dispatch => ({
    createNote: note => dispatch(createNote(note))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteForm);