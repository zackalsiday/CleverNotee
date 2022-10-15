import {connect} from 'react-redux'
import NotebookList from './notebooksList'
import { fetchNotebooks } from '../../actions/notebook_actions'
import { createNotebook } from '../../actions/notebook_actions'
import { deleteNotebook } from '../../actions/notebook_actions'
import { updateNotebook } from '../../actions/notebook_actions'
import {fetchNotes} from '../../actions/note_actions'
const mapStateToProps = (state) => ({
    currentUser: state.entities.users[state.session.id],
    notebooks: state.entities.notebooks,
    notes: state.entities.notes
})

const mapDispatchToProps = dispatch => ({
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    createNotebook: notebook => dispatch(createNotebook(notebook)),
    deleteNotebook: notebookId => dispatch(deleteNotebook(notebookId)),
    updateNotebook: notebook => dispatch(updateNotebook(notebook)),
    fetchNotes: () => dispatch(fetchNotes())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotebookList)