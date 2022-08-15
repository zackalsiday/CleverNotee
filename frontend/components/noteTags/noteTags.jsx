import React from 'react'
import {Link} from 'react-router-dom'
import TagsListContainer from '../tagsList/tagsList_container'
import { Redirect } from 'react-router-dom'
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
        // console.log(reverse)
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
        <ul>
            {reversed.map((noteTags) => (
                <li>
                    {/* {console.log(noteTags)} */}
                    <Link to={`/tags/${this.props.match.params.tag_id}/notes/${noteTags.note_id}`}>
                    
                    {
                
                   Object.assign({}, noteTags).note.title
                }
                </Link>
                    </li>
                 
           
        ))}
        </ul>
        )
    }

    filteredNotes(){
        // let first = Object.values(this.props.noteTags)
        // let filteredNoteTags = first.filter(noteTag => noteTag.tag_id.toString() === this.props.match.params.tag_id)
        // return filteredNoteTags
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
                {/* {console.log(this.props.notes)} */}
                {this.renderNotes()}
                {this.state.tagsVisible === true ? this.renderTags() : ''}
                {/* {this.state.empty === true ? (<Redirect to={`/tags/${this.props.match.params.tag_id}/notes/${this.firstNote()}`}/>) : '' } */}
                <button onClick={this.toggleTags}>
                    Tags
                </button> 
            </div>

        )

    }
}

export default NoteTags