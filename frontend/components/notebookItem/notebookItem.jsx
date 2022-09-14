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
            <button className='notebook-delete-but'onClick={() => this.deleteNotebook(this.props.notebook.id)}>Delete</button>
        )
    }

    firstNoteId() {
        let notesArray = Object.values(this.props.notes)
        let filteredNotes = notesArray.filter(note => note.notebookId === this.props.notebook.id)
    
        let final = []
        filteredNotes.map((note) => (
            final.push(note.id)
        ))
        return final
    }

    
    render() {
        return (
            // this.firstNoteId().length === 0 ? `/notebooks/${this.props.notebook.id}/notes` : `/notebooks/${this.props.notebook.id}/notes/${this.firstNoteId()[this.firstNoteId().length - 1]}`
            <div className='notebooks-list'>

                <li className='notebook-option-container'>
        
                    <Link className='notebook-name' to={this.firstNoteId().length === 0 ? `/notebooks/${this.props.notebook.id}/notes` : `/notebooks/${this.props.notebook.id}/notes/${this.firstNoteId()[this.firstNoteId().length - 1]}`}>
                        {this.props.notebook.name}
                    </Link>
                    <br />
                    <div className='notebook-author'>{this.props.currentUser.username}</div>
                    <div className='notebook-action'>

                        {this.props.notebook.name != 'first notebook' ? this.deleteButton() : ''}
                        {this.props.notebook.name != 'first notebook' ? 
                                <form onSubmit={() => this.props.updateNotebook(this.state)}>
                                <input 
                                type="text" 
                                value={this.state.name}
                                onChange={this.update('name')}
                                />
                                <input 
                                type="submit" 
                                value="Rename"
                                />
                            </form>
                        : '' }
                    </div>
                
                </li>
            </div>
            
        )
    }
}

export default NotebookItem