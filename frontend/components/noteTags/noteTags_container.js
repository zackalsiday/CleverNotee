import {connect} from 'react-redux'
import NoteTags from './noteTags'
import {fetchNoteTags} from '../../actions/note_tag_actions'
import { fetchNotes } from '../../actions/note_actions'

const mapStateToProps = (state, ownProps) => ({
    noteTags: Object.values(state.entities.noteTags).filter(noteTag => noteTag.tag_id.toString() === ownProps.match.params.tag_id),
    notes: state.entities.notes,
    ownProps
})

const mapDispatchToProps = dispatch => ({
    fetchNoteTags: () => dispatch(fetchNoteTags()),
    fetchNotes: () => dispatch(fetchNotes())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteTags)