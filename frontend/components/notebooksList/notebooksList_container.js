import {connect} from 'react-redux'
import NotebookList from './notebooksList'
import { fetchNotebooks } from '../../actions/notebook_actions'
import { createNotebook } from '../../actions/notebook_actions'
import { deleteNotebook } from '../../actions/notebook_actions'
const mapStateToProps = (state) => ({
    currentUser: state.entities.users[state.session.id],
    notebooks: state.entities.notebooks
})

const mapDispatchToProps = dispatch => ({
    fetchNotebooks: () => fetchNotebooks(),
    createNotebook: notebook => dispatch(createNotebook(notebook)),
    deleteNotebook: notebookId => dispatch(deleteNotebook(notebookId))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotebookList)