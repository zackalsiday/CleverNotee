import React from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { TbNotes } from 'react-icons/tb'
class NotebookShow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            author_id: parseInt(this.props.currentUser.id),
            notebook_id: parseInt(this.props.match.params.notebook_id),
            currentNotebookName: '',
            newNoteId: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
       this.props.fetchNotes()
        this.props.fetchNotebook(this.props.match.params.notebook_id).then((res) => {
            this.setState({currentNotebookName: res.notebook.name})
        })
    }



    renderNotes(){
        let notesArray = Object.values(this.props.notes)
        let filteredNotes = notesArray.filter(note => note.notebookId.toString() === this.props.match.params.notebook_id.toString())
        let reversed = filteredNotes.reverse()
        return(
            <div className = 'notes-list-container'>
                <div className='notes-list-header'>
                    <TbNotes className='notes-list-logo' stroke='white' fill='black' size='1.4em' color='black' />
                    <p>Notes</p>
                    <p className='notes-count'>{reversed.length} notes</p>
                </div>
                <ul>
                    {reversed.map((note) => (
                    <div>

                        <li>
                            <Link to={`/notebooks/${note.notebookId}/notes/${note.id}`}>
                                    <button className='note-item' style={{ backgroundColor: this.props.location.pathname.includes(note.id) ? '#ffffff' : '#f8f8f8' }}>{note.title}</button>
                            </Link>   
                        </li>
                    </div>
                    ))}
                </ul>
            </div>
        )
    }


    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const note = Object.assign({}, this.state)
        this.props.createNote(note)
        this.setState({ title: '', content: '' })
    }

    renderForm(){
        if (this.props.match.path == "/notebooks/:notebook_id/notes"){
            return (
            <div>
            
                  <form onSubmit={this.handleSubmit}>
                    <input type="text"
                        value={this.state.title}
                        placeholder='please title your note'
                        onChange={this.update('title')}
                    />
                    <br />
                    <input
                        type="text"
                        value={this.state.content}
                        placeholder='take notes here'
                        onChange={this.update('content')}
                    />

                    <input type="submit"
                        value='submit'
                    />
                </form>
            </div>
              
            )
        }
 
    }

    filteredFirstNoteId() {
        let notesArray = Object.values(this.props.notes)

        let filteredNotes = notesArray.filter(note => note.notebookId.toString() === this.props.match.params.notebook_id)
        let final = []
        filteredNotes.map((note) => (
            final.push(note.id)
        ))
        return final
    }


    render() {

        return (
            <div>
                
                {/* <button className='new-button' onClick={this.createNote}>
                 New
              </button> */}
            {this.state.newNoteId != '' ? (<Redirect to={`/notebooks/${this.props.match.params.notebook_id}/notes/${this.state.newNoteId}`}/>) : ''}
               {this.renderNotes()}
            {this.filteredFirstNoteId().length === 0 ? `Your ${this.state.currentNotebookName} is empty. Simply click the New button to create a new note in this Notebook` : ''}
            </div>

        )

    }
}

export default NotebookShow
