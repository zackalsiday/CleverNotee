import React from 'react'
import { fetchNotes } from '../../actions/note_actions'
import NoteItem from '../noteItem/note_item'
import Link from 'react-router-dom'
import NoteForm from '../noteForm/noteForm'
import { TbNotes } from 'react-icons/tb'
class Note extends React.Component{
    constructor(props){
        super(props)
        this.state = {note: null }
    }
    componentDidMount(){
        let allNotes = this.props.fetchNotes
        dispatch(allNotes())
        this.props.fetchNoteTags()
        // dispatch(this.props.fetchNote(1))
     
    }

    renderNotes(){
        let notesArray = Object.values(this.props.notes)
        let reversed = notesArray.reverse()

        
        return(
            <div className='notes-list-container'>
            <div className='notes-list-header'>
                <TbNotes className='notes-list-logo'stroke='white' fill='black' size='1.4em' color='black' />
                <p>Notes</p>
            </div>
                <ul>
                    {reversed.map((note) => (
                        <li><NoteItem noteTags={this.props.noteTags} note={note}/></li>
                        
                    ))}
                </ul>
            </div>

        )
    }

    render(){
        
        return (
        <div>
            {/* {console.log(this.props)} */}
            {this.renderNotes()}
               
        </div>
            
        )
  
    }
}

export default Note



