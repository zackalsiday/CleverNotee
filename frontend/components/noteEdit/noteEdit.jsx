import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
// import ReactQuill, {Quill} from 'react-quill';
// import "../../../node_modules/react-quill/dist/quill.snow.css"
import { EditorState}  from "draft-js";
// // import {getCurrentContent} from "draft-js"
// import { convertToRaw } from 'draft-js'
import { Editor } from "react-draft-wysiwyg";
import RichEditor from '../RichEditor/RichEditor';
import { stateToHTML } from 'draft-js-export-html'
import { convertToRaw } from 'draft-js'
class NoteEdit extends Component {
    constructor(props) {
        super(props)
        this.state =   {title: '',
            // content: '',
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
        this.createNoteTag = this.createNoteTag.bind(this)
        this.removeTagfromNote = this.removeTagfromNote.bind(this)
        this.addNewTag = this.addNewTag.bind(this)
        this.changeContent = this.changeContent.bind(this)
    }





    componentDidMount() {
        this.props.fetchTags()
        this.props.fetchNotes()
        this.props.fetchNoteTags()
        this.props.fetchNotebooks()
        // this.filteredNoteTags().map((tag) => {(
        //     this.setState({
        //         chosenTags: this.state.chosenTags << tag.tag_id
        //     })
        
        // this.filteredNoteTags().map((tag) => {
        //           this.setState({
        //         chosenTags: this.state.chosenTags << tag.tag_id
        //     })
        // })

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
        // console.log(this.state.editorState)
        // console.log(oldNote)
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
            // const note = Object.assign({}, this.state)
            // this.props.fetchNotes()
  
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
          window.location.reload()
       }
      
   
        // delete the note_tag first then use the res to delele the note itself.

         
       
    
 
    }

    update(field) {
  
       return  e => this.setState({
            [field]: e.currentTarget.value,
            redirectNotebooks: this.props.match.path === "/notebooks/:notebook_id/notes/:note_id" ? true : false ,
            redirectNotes: this.props.match.path === "/notes/:note_id" ? true : false,
            changed: this.props.match.path === "/tags/:tag_id/notes/:note_id" ? true : false
        })
         
    }

//    renderRichEditor(content){
//         return  < RichEditor changeContent={this.changeContent} updateNote={this.props.updateNote} noteId={this.props.ownProps.match.params.note_id} content={content} />
  
//    }

 
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

    createNoteTag(){
        let note = { title: 'Untitled', content: '', author_id: this.props.currentUser.id, notebook_id: this.firstNotebookId() }
        dispatch(this.props.createNote(note)).then((res) => {
            let noteTag = {note_id: parseInt(res.note.id), tag_id: parseInt(this.props.match.params.tag_id)}
            dispatch(this.props.createNoteTag(noteTag)).then((res) => {
                this.setState({
                    title: res.note_tag.note.title,
                    content: res.note_tag.note.content,
                    notebook_id: res.note_tag.note.notebook_id
                })
            }).then((res) =>{
                this.setState({
                    newNoteTag: true
                })
            })
        })
        // let note = {note_id: 1175, tag_id: 3}
        // dispatch(this.props.createNoteTag(note))
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
                <ul>
                    {this.filteredNoteTags().map((tag) =>
                        <li> 
                            {tag.tag.name}
                            <button onClick={() => this.removeTagfromNote(tag)}>Delete</button>
                        </li>
                    )}
                </ul>
            )
        }
    }

   tagOptions(){
       let allTags = Object.values(this.props.tags)
       return (
           <ul>
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
//    updateEditorState(editorState){
//        this.setState({editorState})
//    }

    // onEditorStateChange = (editorState) => {
    //     // console.log(editorState)
    //     this.setState({
    //         editorState,
    //     });
    // };

   

//         let notebooksArray = Object.values(this.props.notebooks)
// return (
//     <select value={this.state.notebook_id} onChange={this.update('notebook_id')} >
//         {notebooksArray.map((notebook) => (
//             <option value={notebook.id}>{notebook.name}</option>
//         ))}
//     </select>
// )

    render() {
        let first = this.props.noteTag[0]
        let firstId = Object.assign({}, first).note_id
        return (
           
            <div>

                {/* {this.state.empty === true  ? (<Redirect push to={`/notebooks/${this.props.match.params.notebook_id}/notes`} />): '' } 
                {this.state.redirectNotebooks === true ? (<Redirect to={`/notebooks/${this.props.match.params.notebook_id}/notes/${this.filteredFirstNoteId()[this.filteredFirstNoteId().length - 1]}`} />) : '' }
                {this.state.redirectNotes === true? (<Redirect push to={`/notes/${this.firstNoteId()[this.firstNoteId().length - 1]}`} />) : null}
                {this.state.newNoteTag === true ? (<Redirect push to={`/tags/${this.props.match.params.tag_id}/notes/${this.firstNoteTag()}`} />) : null}
                {this.state.noteTagdeleted === true ? (<Redirect push to={`/tags/${this.props.match.params.tag_id}/notes/${this.firstNoteTag()}`} />) : null}
                <div>

                    {this.props.match.path === '/tags/:tag_id/notes/:note_id' ? <button onClick={this.createNoteTag}>New</button> : ''}
                    <br />
                
                      <button onClick={this.deleteNote} >
                        Delete
                    </button> 
             
                    {this.state.content != undefined ?  < RichEditor changeContent={this.changeContent} updateNote={this.props.updateNote} fetchNote={this.props.fetchNote} noteId={this.props.ownProps.match.params.note_id} content= {this.state.content}  /> : ''} 
                   
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
                    {this.renderTags()}
                    {this.tagOptions()}
                    <form onSubmit={this.addNewTag}>
                        <input type="text" 
                            value={this.state.addTag}
                            onChange={this.updateTagInput('addTag')}
                        />
                        <input type="submit" 
                            value='Submit'
                        />
                    </form>
                </div>
             */}
             
            </div>

        )

    }
}

export default NoteEdit 

