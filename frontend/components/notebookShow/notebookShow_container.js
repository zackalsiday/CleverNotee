import { connect } from "react-redux";
import NotebookShow from "./notebookShow";
import { fetchNotes } from '../../actions/note_actions'
const mapStateToProps = (state) => ({
    notes: state.entities.notes 
})

const mapDispatchToProps = dispatch => ({
    fetchNotes: () => dispatch(fetchNotes())
})

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(NotebookShow)