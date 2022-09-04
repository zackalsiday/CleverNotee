import {connect} from 'react-redux'
import RichEditor from './RichEditor'

import { updateNote } from '../../actions/note_actions'

const mapDispatchToProps = dispatch => ({
    updateNote: note => dispatch(updateNote(note))
})

export default connect(
    null,
    mapDispatchToProps
)(RichEditor)