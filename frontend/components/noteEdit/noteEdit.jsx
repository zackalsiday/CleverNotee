import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { EditorState, KeyBindingUtil}  from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import RichEditor from '../RichEditor/RichEditor';
import { stateToHTML } from 'draft-js-export-html'
import { convertToRaw } from 'draft-js'
class NoteEdit extends Component {
    constructor(props) {
        super(props)
        this.state =   {title: '',
            author_id: '',
            notebook_id: '',
            id: '',
            url: '',
            redirectNotes: false,
            redirectNotebooks: false,
            filteredNotes : '',
            empty:  false,
            changed: false,
            prevTitle: '',
            newNoteTag: false,
            noteTagdeleted: false,
            chosenTags: [],
            addTag: ''

        } 
        this.deleteNote = this.deleteNote.bind(this)
        this.createNote = this.createNote.bind(this)
        this.removeTagfromNote = this.removeTagfromNote.bind(this)
        this.addNewTag = this.addNewTag.bind(this)
        this.changeContent = this.changeContent.bind(this)
    }





    componentDidMount() {
        this.props.fetchTags()
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
    }

    componentDidUpdate(prevProps, prevState) {
        let oldNoteTag = Object.assign({}, prevProps.noteTag)
        let oldNoteTagTwo = Object.assign({}, oldNoteTag[0])
        let oldNote = Object.assign({}, oldNoteTagTwo.note)
        if (this.props.match.params.note_id === 'undefined' && this.props.location.pathname != "/notes/undefined"){
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
  
        }else if(prevState.title != this.state.title ) {
            const note = Object.assign({}, this.state)
            this.props.updateNote(note) 
            dispatch(this.props.fetchNote(this.state.id))
          
        }else if(prevState.content != this.state.content){
            const note = Object.assign({}, this.state)
            this.props.updateNote(note)
           
        }else if (prevState.notebook_id != this.state.notebook_id){
            const note = Object.assign({}, this.state)
            this.props.updateNote(note)
         
         }else if( oldNote.title !== this.state.title && this.props.match.path === '/tags/:tag_id/notes/:note_id'){
           this.props.updateNoteTag({ id: oldNoteTagTwo.id, tag_id: this.props.match.params.tag_id, note_id: this.props.match.params.note_id })
       } else if (oldNote.content !== this.state.content && this.props.match.path === '/tags/:tag_id/notes/:note_id') {
           this.props.updateNoteTag({ id: oldNoteTagTwo.id, tag_id: this.props.match.params.tag_id, note_id: this.props.match.params.note_id })
       }else if (this.state.noteTagdeleted === true){
            this.props.fetchNoteTags()
         
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

    updateTitle(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }


 
    deleteNote(){
     
        if (this.props.match.path !== "/tags/:tag_id/notes/:note_id"){
               this.props.deleteNote(this.state.id)
               this.setState({
            redirectNotebooks: this.props.match.path === "/notebooks/:notebook_id/notes/:note_id" ? true : false,
            redirectNotes: this.props.match.path === "/notes/:note_id" ? true : false,
                   empty: this.filteredFirstNoteId().length === 0  ? true : false 
        })
        }else{
            let noteTagId = Object.assign({}, this.props.noteTag[0]).id
            dispatch(this.props.deleteNoteTag(noteTagId)).then((res) => {
                this.setState({
                    noteTagdeleted: true
                })
            })
        
        }
     
    }



    notebookOptions() {
        let notebooksArray = Object.values(this.props.notebooks)
        return (
            <div>
                <select className='notebook-options'  style={{outline: 'none'}}value={this.state.notebook_id} onChange={this.update('notebook_id')} >
                        {notebooksArray.map((notebook) => (
                        <option value={notebook.id}>{notebook.name}</option>
                    ))}
                </select>
            </div>
        )

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

    firstNoteId(){
        let notesArray = Object.values(this.props.notes)
        let final = []
        notesArray.map((note) => (
            final.push(note.id)
        ))
        return final
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

    firstNoteTag(){
        let last = this.props.noteTags[this.props.noteTags.length - 1]
        let lastId = Object.assign({},last).note_id
        return lastId
    }

    filteredNoteTags() {

        let filtered = this.props.noteTagsforNotes.filter(noteTag => noteTag.note_id.toString() === this.props.match.params.note_id)

        return filtered 
    }
    removeTagfromNote(tag){
        if (this.props.match.path !== "/tags/:tag_id/notes/:note_id"){
               dispatch(this.props.deleteNoteTag(tag.id)).then((res) => {
            window.location.reload()
        })
            }else{
            dispatch(this.props.deleteNoteTag(tag.id)).then((res) => {
                window.location.reload()
            }).then((res) => {
                this.setState({
                    noteTagdeleted: true
                })
            })
            }
        }
     
    renderTags() {
        if (this.filteredNoteTags().length != 0) {
            return (
                <ul className='chosen-tags'>
                    {this.filteredNoteTags().map((tag) =>
                
                        <li> 
                            <button className='chose-tag-name' onClick={() => this.removeTagfromNote(tag)}>{tag.tag.name}</button> 
                            <button className='delete-tag-but' onClick={() => this.removeTagfromNote(tag)}>Delete</button>
                        </li>
                   
                    )}
                </ul>
            )
        }
    }

   tagOptions(){
       let allTags = Object.values(this.props.tags)
       return (
           <ul className='tag-options'>
               <li>choose a tag</li>
               {allTags.map((tag) => 
                    
                   <li onClick={() => dispatch(this.props.createNoteTag({ tag_id: tag.id, note_id: parseInt(this.props.match.params.note_id) }))}>
                       {tag.name}
                   </li>
               )}
           </ul>
       )
   }


   updateTagInput(field){
       return e => this.setState({
           [field]: e.currentTarget.value 
       })

   }

   addNewTag(){
       dispatch(this.props.createTag({name: this.state.addTag, user_id: this.props.currentUser.id})).then((res) => {
           dispatch(this.props.createNoteTag({note_id: this.props.match.params.note_id, tag_id: res.tag.id}))
       })
   }


   changeContent(newContent){
      return () => this.setState({content: newContent})
   }

    render() {
        let first = this.props.noteTag[0]
        let firstId = Object.assign({}, first).note_id
        return (
           
            <div className='note-edit-container'>

                {this.state.empty === true  ? (<Redirect push to={`/notebooks/${this.props.match.params.notebook_id}/notes`} />): '' } 
                {this.state.redirectNotebooks === true ? (<Redirect to={`/notebooks/${this.props.match.params.notebook_id}/notes/${this.filteredFirstNoteId()[this.filteredFirstNoteId().length - 1]}`} />) : '' }
                {this.state.redirectNotes === true? (<Redirect push to={`/notes/${this.firstNoteId()[this.firstNoteId().length - 1]}`} />) : null}
                {this.state.newNoteTag === true ? (<Redirect push to={`/tags/${this.props.match.params.tag_id}/notes/${this.firstNoteTag()}`} />) : null}
                {this.state.noteTagdeleted === true ? (<Redirect push to={`/tags/${this.props.match.params.tag_id}/notes/${this.firstNoteTag()}`} />) : null}
                <div className='note-edit-form-container'>

                    {/* {this.props.match.path === '/tags/:tag_id/notes/:note_id' ? <button className='new-button' onClick={this.createNoteTag}>New</button> : ''} */}
                    <br />
                
                      <button className='delete-note-but' onClick={this.deleteNote} >
                        Delete
                      </button> 
             
                    {this.state.content != undefined ? < RichEditor  changeContent={this.changeContent} updateNote={this.props.updateNote} fetchNote={this.props.fetchNote} noteId={this.props.ownProps.match.params.note_id} content= {this.state.content}  /> : ''} 
                    <div className='note-edit-form'>

                    <form>
                        <input type="text"
                            value={ this.state.title}
                            placeholder='please title your note'
                            onChange={this.updateTitle('title')}
                            className='note-title'
                        />
                        <br />
                        {/* <input
                            type="text"
                            value={this.state.content}
                            placeholder='take notes here'
                            onChange={this.update('content')}
                        /> */}
                        {this.notebookOptions()}
                        </form> 
                        <div className='note-edit-tags'>

                        <form onSubmit={this.addNewTag}>
                            <input type="text" 
                                value={this.state.addTag}
                                onChange={this.updateTagInput('addTag')}
                                placeholder='Create a new Tag'
                                className='create-new-tag-in-note'
                                />
                            {/* <input type="submit" 
                                value='Submit'
                            /> */}
                        </form>
                
                            {this.tagOptions()}
                            {this.renderTags()}
                        </div>
                    </div>
                </div>
            
             
            </div>

        )

    }
}

export default NoteEdit 

