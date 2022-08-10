import React from 'react'
import { Link, Switch} from 'react-router-dom'
import { ProtectedRoute } from '../../util/route_util'
import NoteContainer from '../notesList/notes_container'
import NoteFormContainer from '../noteForm/noteForm_container'
import NoteItem from '../noteItem/note_item'
import {Route} from 'react-router-dom'
import NoteEditContainer from '../noteEdit/noteEdit_container'
import NotebookListContainer from '../notebooksList/notebooksList_container'
import NotebookShowContainer from '../notebookShow/notebookShow_container'
import TagsListContainer from '../tagsList/tagsList_container'
import { Redirect } from 'react-router-dom'
import NoteTags from '../noteTags/noteTags'
class Main extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {tagsVisible: false, redirect: false}
        this.toggleTags = this.toggleTags.bind(this)
        this.turnOffTags = this.turnOffTags.bind(this)
        this.createNote = this.createNote.bind(this)
      
    }

    toggleTags(){
        if(this.state.tagsVisible === false){
            this.setState({tagsVisible: true})
        }else{
            this.setState({tagsVisible: false})
        }
   
    }

    componentDidMount(){
       this.props.fetchNotes()
       this.props.fetchNotebooks()
    }

 

    turnOffTags(){
        if(this.state.tagsVisible === true){
            this.setState({tagsVisible: false})
        }
    }
    
    
    renderTags(){
        return(
            <TagsListContainer/>
        )
    }

    firstNoteId(){
        let notesArray = Object.values(this.props.notes)
        let final = []
        notesArray.map((note) => (
            final.push(note.id)
        ))
        return final
    }

    firstNotebookId(){
        let notebooksArray = Object.values(this.props.notebooks)
        let final = []
        notebooksArray.map((notebook) => (
            final.push(notebook.id)
        ))
        return final 
    }

    createNote(){
    
        let noteOne = {title: 'Untitled', content: '', author_id: this.props.currentUser.id , notebook_id: this.firstNotebookId()[0] }
       

            dispatch(this.props.createNote(noteOne)).then((res) => {
                this.setState({ redirect: true }).then((res) => {
                    this.setState({redirect: false})
                })

            })
   
        
           
    }




    render(){
     
        return (
            <div>
               
                <hgroup className="header-group">
                    <h2 className="header-name">Hi, {this.props.currentUser.username}!</h2>
                    {this.state.redirect ? (<Redirect push to={`/notes/${this.firstNoteId()[this.firstNoteId().length - 1]}`} />) : null}
                    {this.props.location.pathname.includes('notebooks') === true ? '' : <button onClick={this.createNote}> New </button> }
                       
                
                    <br />
                    <Link to='/'>
                        <button onClick={this.turnOffTags}>
                            Home
                        </button>
                    </Link>
                    <br />
                     <Link to={`/notes/${this.firstNoteId()[this.firstNoteId().length - 1]}`}> 
                        <button onClick={this.turnOffTags} >
                            Notes 
                        </button>
                    </Link>
                    <br />
                    <Link to='/notebooks'>
                        <button onClick={this.turnOffTags}>
                            Notebooks
                        </button>
                    </Link>
                    <br />
                   {this.props.location.pathname.includes('tags') === false ? 
                   <button onClick={this.toggleTags}>
                            Tags 
                        </button> : ''
                }
                       
                  
                  {this.props.location.pathname.includes('tags') === true ?  this.turnOffTags() : null
                    }
                     
              
                            
                  

                    <br />
                    <button className="header-button" onClick={this.props.logout}>Log Out</button>
                   
                </hgroup>

                {this.state.tagsVisible === true ? this.renderTags() : ''}
                <Switch>
                    <Route exact path="/notebooks/:notebook_id/notes" component={NotebookShowContainer} />
                    <Route path="/notebooks/:notebook_id/notes/:note_id" component={NotebookShowContainer} />
                    <Route path="/notebooks" component={NotebookListContainer}/>
                </Switch>

                    <Route path="/notes" component={NoteContainer}/>
                    {/* <ProtectedRoute path="/tags/:tag_id/notes" component={NoteContainer}/>
                    <ProtectedRoute path="/tags/:tag_id/notes" component={NoteFormContainer} /> */}
                <Route path="/tags/:tag_id/notes" component={NoteTags}/>            
                <Switch>
                 <Route path="/notebooks/:notebook_id/notes/:note_id" component={NoteEditContainer}/>
                 <Route path="/notes/:note_id" component={NoteEditContainer} />
                 <Route path="/notes" component={NoteFormContainer} />
                </Switch>

          
        

        
                
            </div>
        )
    }
}

export default Main 