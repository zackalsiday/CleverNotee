import { connect } from 'react-redux';

import { logout } from '../../actions/session_actions';
import Main from './main';
import { fetchNotes } from '../../actions/note_actions';
import {createNote} from '../../actions/note_actions'
import { fetchNotebooks } from '../../actions/notebook_actions';
const mapStateToProps = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    notes: state.entities.notes,
    notebooks: state.entities.notebooks,
    ownProps
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    fetchNotes: () => dispatch(fetchNotes()),
    createNote: note => (createNote(note)),
    fetchNotebooks: () => dispatch(fetchNotebooks())
    
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);