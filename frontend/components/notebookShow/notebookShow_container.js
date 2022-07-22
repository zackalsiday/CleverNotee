import { connect } from "react-redux";
import NotebookShow from "./notebookShow";
import { fetchNotes } from '../../actions/note_actions'
import { createNote } from '../../actions/note_actions'
const mapStateToProps = (state) => ({
    notes: state.entities.notes,
    currentUser: state.entities.users[state.session.id],
    state 
})

const mapDispatchToProps = dispatch => ({
    fetchNotes: () => dispatch(fetchNotes()),
    createNote: note => dispatch(createNote(note))
})

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(NotebookShow)