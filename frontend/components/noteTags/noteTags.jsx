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
            <TagsListContainer />
        )
    }

    componentDidMount(){
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

    // componentDidUpdate(prevProps, prevState){
    //     if(prevProps.noteTags === this.props.noteTags){
          
    //     }
    // }

    toggleTags() {
        if (this.state.tagsVisible === false) {
            this.setState({ tagsVisible: true })
        } else {
            this.setState({ tagsVisible: false })
        }

    }
    renderNotes(){
        return (
        <ul>
            {this.filteredNotes().reverse().map((noteTags) => (
                <li>
                    <Link to={`/tags/${this.props.match.params.tag_id}/notes/${this.props.match.params.note_id}`}>
                    
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
                {/* {console.log(this.props)} */}
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