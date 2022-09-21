import React from 'react'
import {Link} from 'react-router-dom'
import TagsListContainer from '../tagsList/tagsList_container'
import { Redirect } from 'react-router-dom'
import { TbNotes } from 'react-icons/tb'
class NoteTags extends React.Component {
    constructor(props) {
        super(props)
        this.state = {tagsVisible: false, firstNote: '', empty: false}
        this.toggleTags = this.toggleTags.bind(this)
    }

    renderTags() {
        return (
            <TagsListContainer toggleTags={this.toggleTags} />
        )
    }



    componentDidMount(){
        this.props.fetchNotes()
    this.props.fetchNoteTags().then((res) => {
                let first = Object.values(this.props.noteTags)
        let filteredNoteTags = first.filter(noteTag => noteTag.tag_id.toString() === this.props.match.params.tag_id)
        let reverse = filteredNoteTags.reverse()
        this.setState({firstNote: reverse[0].id})
    }).then((res) => {
        let first = Object.values(this.props.noteTags)
        let filteredNoteTags = first.filter(noteTag => noteTag.tag_id.toString() === this.props.match.params.tag_id)
        if(filteredNoteTags.length != 0){
            this.setState({empty: true})
        }
   
    })

    }

    

    toggleTags() {
        if (this.state.tagsVisible === false) {
            this.setState({ tagsVisible: true })
        } else {
            this.setState({ tagsVisible: false })
        }

    }
    renderNotes(){
        let reversed = this.filteredNotes().reverse()
        return (
            <div className='notes-list-container'>
                <div className='notes-list-header'>
                    <TbNotes className='notes-list-logo' stroke='white' fill='black' size='1.4em' color='black' />
                    <p>Notes</p>
                    <p className='notes-count'>{reversed.length} notes</p>
                </div>
            <ul>
                {reversed.map((noteTags) => (
                    <li>
                        <Link to={`/tags/${this.props.match.params.tag_id}/notes/${noteTags.note_id}`}>
                        
                        {
                    
                                <button className='note-item' style={{ backgroundColor: parseInt(this.props.match.params.note_id) === Object.assign({}, noteTags).note_id ? '#ffffff' : '#f8f8f8' }}>{Object.assign({}, noteTags).note.title}</button>
                    }
                    </Link>
                        </li>
                    
            
            ))}
            </ul>
        </div>
        )
    }

    filteredNotes(){
        return this.props.noteTags
    }

    firstNote(){
        let reversedNotes = this.filteredNotes().reverse()
        let newObj = Object.assign({}, reversedNotes[0])
        return newObj.note_id 
    }


    render() {

        return (
            <div>
                {this.renderNotes()}
                {this.state.tagsVisible === true ? this.renderTags() : ''}
                {/* {this.state.empty === true ? (<Redirect to={`/tags/${this.props.match.params.tag_id}/notes/${this.firstNote()}`}/>) : '' } */}
                {/* <button onClick={this.toggleTags}>
                    Tags
                </button>  */}
            </div>

        )

    }
}

export default NoteTags