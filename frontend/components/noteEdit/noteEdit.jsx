import React from 'react'
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
class NoteEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state =   {title: '',
            content: '',
            author_id: '',
            notebook_id: '',
            id: '',
            url: '',
            redirectNotes: false,
            redirectNotebooks: false,
            filteredNotes : '',
            empty:  false,
            changed: false
        } 
        
        this.deleteNote = this.deleteNote.bind(this)
        this.createNote = this.createNote.bind(this)
    }


    componentDidMount() {
        this.props.fetchNotes()
        this.props.fetchNoteTags()
        this.props.fetchNotebooks()


                  dispatch(this.props.fetchNote(this.props.match.params.note_id)).then((res) => {
            this.setState({
                title: res.note.title,
                content: res.note.content,
                author_id: res.note.authorId,
                notebook_id: res.note.notebookId,
                id: res.note.id
            })
         })
    
        
  
     
    
       
        // this.props.match.path == "/notebooks/:notebook_id/notes/:note_id" ? this.setState({url: `/notebooks/${this.props.match.params.notebook_id}/notes`}) : this.setState({url: `/notes/${this.firstNoteId()[this.firstNoteId().length - 1]}`})
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(prevState.title)
        console.log(this.state.title)
        if(this.props.match.params.note_id === 'undefined'){
            this.setState({empty: true})
        }
       if((prevProps.match.params.note_id != this.props.match.params.note_id) && this.props.match.params.note_id != 'undefined') {
            dispatch(this.props.fetchNote(this.props.match.params.note_id)).then((res) => {
                this.setState({
                    title: res.note.title,
                    content: res.note.content,
                    author_id: res.note.authorId,
                    notebook_id: res.note.notebookId,
                    id: res.note.id
                })
            })
            // const note = Object.assign({}, this.state)
            // this.props.fetchNotes()
  
        }else if(prevState.title != this.state.title) {
            const note = Object.assign({}, this.state)
            this.props.updateNote(note) 

        }else if(prevState.content != this.state.content){
            const note = Object.assign({}, this.state)
            this.props.updateNote(note)
        }else if (prevState.notebook_id != this.state.notebook_id){
            const note = Object.assign({}, this.state)
            this.props.updateNote(note)
         
        }


    
 
    }

    update(field) {
  
       return  e => this.setState({
            [field]: e.currentTarget.value,
            redirectNotebooks: this.props.match.path === "/notebooks/:notebook_id/notes/:note_id" ? true : false ,
            redirectNotes: this.props.match.path === "/notes/:note_id" ? true : false,
            changed: this.props.match.path === "/tags/:tag_id/notes/:note_id" ? true : false
        })
         
    }

    deleteNote(){
        this.props.deleteNote(this.state.id)
        this.setState({
            redirectNotebooks: this.props.match.path === "/notebooks/:notebook_id/notes/:note_id" ? true : false,
            redirectNotes: this.props.match.path === "/notes/:note_id" ? true : false,
            empty: this.filteredFirstNoteId().length === 0 ? true : false 
        })
    }



    notebookOptions() {
        let notebooksArray = Object.values(this.props.notebooks)
        return (
            <select value={this.state.notebook_id} onChange={this.update('notebook_id')} >
                {notebooksArray.map((notebook) => (
                    <option value={notebook.id}>{notebook.name}</option>
                ))}
            </select>
        )

    }

   
    // renderNoteTags(){
    //     let noteTagsArray = Object.values(this.props.noteTags)
    //     return(
    //         <ul>
    //             {noteTagsArray.map((noteTag) => (
    //                 <li>{noteTag.tag.name}</li>
    //             ))}
    //         </ul>
    //     )
        
    // }

    filteredFirstNoteId() {
        let notesArray = Object.values(this.props.notes)
        
        let filteredNotes = notesArray.filter(note => note.notebookId.toString() === this.props.match.params.notebook_id)
        let final = []
        filteredNotes.map((note) => (
            final.push(note.id)
        ))
        return final
    }

    firstNoteId(){
        let notesArray = Object.values(this.props.notes)
        let final = []
        notesArray.map((note) => (
            final.push(note.id)
        ))
        return final
    }

    firstNotebookId() {
        let notebooksArray = Object.values(this.props.notebooks)
        let final = []
        notebooksArray.map((notebook) => (
            final.push(notebook.id)
        ))
        return final[final.length - 1]
    }
    renderNewButton(){
        if (this.props.match.path === '/notebooks/:notebook_id/notes/:note_id') {
            return (<button onClick={this.createNote}>New</button>)
        }
    }

    createNote(){
        let note = { title: 'Untitled', content: '', author_id: this.props.currentUser.id, notebook_id: this.props.match.params.notebook_id }
        dispatch(this.props.createNote(note))
    }



    render() {
        return (
            <div>
                {/* {console.log(this.props)} */}
                {/* {console.log(this.state)} */}
               {this.renderNewButton()}
                {/* {this.state.redirectNotes ? (<Redirect push to={`/notes/${this.firstNoteId()[this.firstNoteId().length - 1]}`} />) : null} 
                // this.state.redirectNotebooks  ? (<Redirect push to={`/notebooks/${this.props.match.params.notebook_id}/notes/${this.filteredFirstNoteId()[this.filteredFirstNoteId().length - 1]}`} />) : null 
                {/* {this.filteredFirstNoteId() === undefined  ? (<Redirect push to={`/notebooks/${this.props.match.params.notebook_id}/notes`} />) : null} */}
                {/* {this.props.match.path === '/notebooks/notebook_id/notes/note_id' ? this.filteredFirstNoteId().length === 0 ? (<Redirect push to={`/notebooks/${this.props.match.params.notebook_id}/notes`} />) : null : null } */}
                {/* {this.props.match.params.note_id != 'undefined' ?  */}
                {this.state.empty === true ? (<Redirect push to={`/notebooks/${this.props.match.params.notebook_id}/notes`} />): '' } 
                {this.state.redirectNotebooks === true ? (<Redirect to={`/notebooks/${this.props.match.params.notebook_id}/notes/${this.filteredFirstNoteId()[this.filteredFirstNoteId().length - 1]}`} />) : '' }
                {this.state.redirectNotes === true? (<Redirect push to={`/notes/${this.firstNoteId()[this.firstNoteId().length - 1]}`} />) : null}
             
                <div>
                    <button onClick={this.deleteNote}>
                        Delete
                    </button>


                    <form >
                        <input type="text"
                            value={ this.state.title}
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
                        {this.notebookOptions()}
                    </form> 
                </div>
                {/* : ''} */}
                {/* {this.renderNoteTags()} */}
            </div>

        )

    }
}

export default NoteEdit 

