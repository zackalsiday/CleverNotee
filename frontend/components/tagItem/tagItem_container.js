import { connect } from 'react-redux';
import TagItem from './tagItem';
import { deleteTag } from '../../actions/tag_actions';
const mapStateToProps = (state, ownProps) => ({
    state
})

const mapDispatchToProps = dispatch => ({
    deleteTag: tagId => dispatch(deleteTag(tagId))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagItem);