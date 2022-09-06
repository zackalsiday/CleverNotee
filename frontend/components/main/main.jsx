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
import NoteTagsContainer from '../noteTags/noteTags_container'
import { AiFillHome } from 'react-icons/ai'
import { TbNotes } from 'react-icons/tb'
import {TbNotebook} from 'react-icons/tb'
import {RiPriceTagFill} from 'react-icons/ri'
import { RiLogoutBoxFill} from 'react-icons/ri'
class Main extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {tagsVisible: false, redirect: false}
        this.toggleTags = this.toggleTags.bind(this)
        this.turnOffTags = this.turnOffTags.bind(this)
        this.createNote = this.createNote.bind(this)
      
    }

    toggleTags(){
        if(this.state.tagsVisible === false ){
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
        if(this.state.tagsVisible === true ){
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

    renderCreatebutton(){
        if (this.props.location.pathname.includes('tags') === true){
            return null
        } else if (this.props.location.pathname.includes('notebooks') === true){
            return null
        }else{
            return <button className='new-button' onClick={this.createNote}> &#43; New</button>
        }
            
        }




    render(){
     
        return (
            <div>
               {/* {console.log(this.props)} */}
                <hgroup className="header-group">
                    <h2 className="header-name">Hi, {this.props.currentUser.username}!</h2>
                    {this.state.redirect ? (<Redirect push to={`/notes/${this.firstNoteId()[this.firstNoteId().length - 1]}`} />) : null}
                    {/* {this.props.location.pathname.includes('tags') === true ? '' : this.renderCreatebutton()}
                    {this.props.location.pathname.includes('notebooks') === true ? '' : this.renderCreatebutton() } */}
                 
                
                    <br />
                <div className='side-nav'>
                    <div className='side-nav-content'>

                    <p className='side-nav-name'>{this.props.currentUser.username}</p>
                     {this.renderCreatebutton()}
                     <br />
                    <Link className='home-link' to='/'>
                        <button className='home-but'onClick={this.turnOffTags}>
                             <AiFillHome size='1.5em' stroke='currentColor' color='#cccccc'/> <p className='home-text'>Home</p>
                        </button>
                        
                    </Link>
                    <br />
                     <Link className='notes-link'to={`/notes/${this.firstNoteId()[this.firstNoteId().length - 1]}`}> 
                        <button className='notes-but' onClick={this.turnOffTags} >
                                <TbNotes  id='notes-logo' fill='#cccccc'  size='1.5em' color='black' /><p className='notes-text'>Notes</p> 
                        </button>
                    </Link>
                    <br />
                    <Link className='notebooks-link'to='/notebooks'>
                            <button className='notebooks-but' onClick={this.turnOffTags}>
                                <TbNotebook  fill='#cccccc' size='1.5em' color='black'  /><p className='notebooks-text'>Notebooks</p> 
                        </button>
                    </Link>
                    <br />
                   {this.props.location.pathname.includes('tags') === false ? 
                            <button className='tags-but' onClick={this.toggleTags}>
                                <RiPriceTagFill size='1.5em' color='#cccccc' /><p className='tags-text'>Tags</p> 
                            </button> : ''
                }
                       
                  
                  {this.props.location.pathname.includes('tags') === true ?  this.turnOffTags() : null
                    }
                     
              
                            
                  

                    <br />
                    <button className="logout-but" onClick={this.props.logout}>
                            <RiLogoutBoxFill size='1.5em' color='#cccccc' /><p className='logout-text'>Log out</p>
                    </button>
                </div>
                   
                    </div>
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
                <Route path="/tags/:tag_id/notes/:note_id" component={NoteTagsContainer}/> 
                <Route path="/tags/:tag_id/notes/:note_id" component={NoteEditContainer}/>
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