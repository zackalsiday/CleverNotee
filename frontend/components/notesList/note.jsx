import React from 'react'
import { fetchNotes } from '../../actions/note_actions'
import NoteItem from '../noteItem/note_item'
import Link from 'react-router-dom'
import NoteForm from '../noteForm/noteForm'
class Note extends React.Component{
    constructor(props){
        super(props)
        this.state = {note: null }
    }
    componentDidMount(){
        let allNotes = this.props.fetchNotes
        dispatch(allNotes())
        // dispatch(this.props.fetchNote(1))
     
    }

    renderNotes(){
        let notesArray = Object.values(this.props.notes)
        
        
        return(
            <ul>
                {notesArray.map((note) => (
                    
                        <NoteItem note={note}/>
                    
                ))}
            </ul>
        )
    }

    render(){
        
        return (
        <div>
            {this.renderNotes()}
               
        </div>
            
        )
  
    }
}

export default Note



