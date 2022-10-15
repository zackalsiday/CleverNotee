import { connect } from "react-redux";
import NotebookShow from "./notebookShow";
import { fetchNotes } from '../../actions/note_actions'
import { createNote } from '../../actions/note_actions'
import { fetchNotebook} from '../../actions/notebook_actions'
const mapStateToProps = (state) => ({
    notes: state.entities.notes,
    currentUser: state.entities.users[state.session.id],
    state 
})

const mapDispatchToProps = dispatch => ({
    fetchNotes: () => dispatch(fetchNotes()),
    createNote: note => (createNote(note)),
    fetchNotebook: notebookId => dispatch((fetchNotebook(notebookId)))
})

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(NotebookShow)