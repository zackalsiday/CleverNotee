import { connect } from 'react-redux';
import TagsList from './tagsList';
import { fetchTags } from '../../actions/tag_actions';
import { createTag } from '../../actions/tag_actions';
import { updateTag } from '../../actions/tag_actions';
const mapStateToProps = (state) => ({
    tags: state.entities.tags,
    currentUser: state.entities.users[state.session.id].id
})
const mapDispatchToProps = dispatch => ({
    fetchTags: () => fetchTags(),
    createTag: tag => dispatch(createTag(tag)),
    updateTag: tagId => dispatch(updateTag(tagId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagsList);