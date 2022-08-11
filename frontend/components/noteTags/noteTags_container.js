import {connect} from 'react-redux'
import NoteTags from './noteTags'
import {fetchNoteTags} from '../../actions/note_tag_actions' 

const mapStateToProps = (state, ownProps) => ({
    noteTags: Object.values(state.entities.noteTags).filter(noteTag => noteTag.tag_id.toString() === ownProps.match.params.tag_id),
    ownProps
})

const mapDispatchToProps = dispatch => ({
    fetchNoteTags: () => dispatch(fetchNoteTags())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteTags)