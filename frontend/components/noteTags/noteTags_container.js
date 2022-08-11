import {connect} from 'react-redux'
import NoteTags from './noteTags'
import {fetchNoteTags} from '../../actions/note_tag_actions' 

const mapStateToProps = (state) => ({
    noteTags: state.entities.noteTags 
})

const mapDispatchToProps = dispatch => ({
    fetchNoteTags: () => dispatch(fetchNoteTags())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteTags)