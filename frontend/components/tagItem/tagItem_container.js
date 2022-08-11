import { connect } from 'react-redux';
import TagItem from './tagItem';
import { deleteTag } from '../../actions/tag_actions';
import { fetchNoteTags } from '../../actions/note_tag_actions'
const mapStateToProps = (state) => ({
    state,
    noteTags: state.entities.noteTags
})

const mapDispatchToProps = dispatch => ({
    deleteTag: tagId => dispatch(deleteTag(tagId)),
    fetchNoteTags: () => dispatch(fetchNoteTags())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagItem);