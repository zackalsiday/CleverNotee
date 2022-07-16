import React from 'react'
import { Link } from 'react-router-dom';
import NoteEdit from '../noteEdit/noteEdit'

class NoteItem extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <li>
            <Link to={`/notes/${this.props.note.id}`}>
             {this.props.note.title}
            </Link>
             
            </li>
        )
    }
}

export default NoteItem