import React from 'react'
import { Link } from 'react-router-dom';


class NotebookItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.notebook.id,
            name: this.props.notebook.name,
            user_id: this.props.notebook.userId 
        }
        this.deleteNotebook = this.deleteNotebook.bind(this)
    }



    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }


    deleteNotebook(notebookId){
        this.props.deleteNotebook(notebookId)
    }

    deleteButton(){
        return(
            <button onClick={() => this.deleteNotebook(this.props.notebook.id)}>Delete</button>
        )
    }

    firstNoteId() {
        let notesArray = Object.values(this.props.notes)
        let filteredNotes = notesArray.filter(note => note.notebookId === this.props.notebook.id)
        console.log(filteredNotes)
        let final = []
        filteredNotes.map((note) => (
            final.push(note.id)
        ))
        return final
    }

    
    render() {
        return (
             
            <li>
                {console.log(this.props)}
                <Link to={`/notebooks/${this.props.notebook.id}/notes/${this.firstNoteId()[this.firstNoteId().length - 1]}`}>
                    {this.props.notebook.name}
                </Link>
                <br />
                {this.props.notebook.name != 'first notebook' ? this.deleteButton() : ''}
          
                <form onSubmit={() => this.props.updateNotebook(this.state)}>
                    <input 
                    type="text" 
                    value={this.state.name}
                    onChange={this.update('name')}
                    />
                    <input 
                    type="submit" 
                    value="submit"
                    />
                </form>
            </li>
        )
    }
}

export default NotebookItem