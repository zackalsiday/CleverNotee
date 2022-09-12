import React from 'react'
import { Link } from 'react-router-dom';
import NoteEdit from '../noteEdit/noteEdit'

class NoteItem extends React.Component{
    constructor(props){
        super(props)
    }

  

    render(){
        return(
        <div>
            {/* {console.log(this.filteredNoteTags())} */}
             <li>
            <Link to={`/notes/${this.props.note.id}`}>
             <button className='note-item'>{this.props.note.title}</button>
            </Link>
           
            </li>
        </div>
           
        )
    }
}

export default NoteItem