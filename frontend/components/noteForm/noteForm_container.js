import { connect } from 'react-redux';

import NoteForm from './noteForm';
import { createNote } from '../../actions/note_actions'
import { fetchNotebooks } from '../../actions/notebook_actions';
import {fetchTags} from '../../actions/tag_actions'
const mapStateToProps = (state) => ({
    currentUser: state.entities.users[state.session.id],
    notebooks: state.entities.notebooks,
    tags: state.entities.tags
});

const mapDispatchToProps = dispatch => ({
    createNote: note => dispatch(createNote(note)),
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    fetchTags: () => dispatch(fetchTags())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteForm);