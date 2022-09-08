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
        this.state = {tagsVisible: false, 
                    redirect: false,
                    homeClick: true,
                    notesClick: false,
                    notebooksClick: false,
                    tagsClick: false,
                    lastState: ''
                }
        this.toggleTags = this.toggleTags.bind(this)
        this.turnOffTags = this.turnOffTags.bind(this)
        this.createNote = this.createNote.bind(this)
        this.homeButClicked = this.homeButClicked.bind(this)
        this.notesButClick = this.notesButClick.bind(this)
        this.notebooksButClick = this.notebooksButClick.bind(this)
    }

    toggleTags(){
        if(this.state.tagsVisible === false ){
            this.setState({homeClick: false, notesClick: false, notebooksClick: false,tagsVisible: true, tagsClick: true, lastState: this.state})
        }else{
            this.setState(this.state.lastState)
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
    

    homeButClicked(){
        this.turnOffTags()
        this.setState({ homeClick: true, notesClick: false, notebooksClick: false, tagsClick: false })
    }

    notesButClick(){
        this.turnOffTags()
        this.setState({ homeClick: false, notesClick: true, notebooksClick: false, tagsClick: false})
    }

    notebooksButClick(){
        this.turnOffTags()
        this.setState({ homeClick: false, notesClick: false, notebooksClick: true, tagsClick: false })
    }
    renderNotes() {
        let notesArray = Object.values(this.props.notes)
        let reversed = notesArray.reverse()


        return (
            <div className='recent-notes-container'>
                <ul className='recent-notes'>
                {reversed.map((note) => (

                    <li><div className='recent-note-but'><span className='recent-note-title'>{note.title}</span></div></li>
                ))}
                </ul>
            </div>
            
        )
    }




    render(){
     
        return (
            <div className='main'>
              
                <div className='main-content' style={{backgroundImage: 'url("images/evernote_mug.png")'}}>
                    {console.log(this.props)}
                    <hgroup className="header-group">
                        <h2 className="header-name">Hi, {this.props.currentUser.username}!</h2>
                        {this.state.redirect ? (<Redirect push to={`/notes/${this.firstNoteId()[this.firstNoteId().length - 1]}`} />) : null}
                        {/* {this.props.location.pathname.includes('tags') === true ? '' : this.renderCreatebutton()}
                        {this.props.location.pathname.includes('notebooks') === true ? '' : this.renderCreatebutton() } */}
                        <br />
                    </hgroup>
                    {this.state.tagsVisible === true ? this.renderTags() : ''}
                    {this.props.location.pathname === '/' ? this.renderNotes() : ''}
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
                        <div className='side-nav'>
                            <div className='side-nav-content'>
                                <div className='side-nav-name'>
                                    <img className='side-nav-name-logo' src={`letters/${Array.from(this.props.currentUser.username)[0].toLowerCase()}.png`} alt="" />
                                    <p className='side-nav-name-text'>{this.props.currentUser.username}</p>
                                </div>
                                {this.renderCreatebutton()}
                                <br />
                            
                                <Link className='home-link' to='/'>
                                    <button className='home-but' onClick={ this.homeButClicked} style={{ backgroundColor: this.props.location.pathname === '/' ? '#404040' :'transparent'  }}>
                                    <AiFillHome size='1.5em' stroke='currentColor' color='#cccccc'/> <p className='home-text'>Home</p>
                                    </button>
                                </Link>
                                
                                <br />
                                <Link className='notes-link'to={`/notes/${this.firstNoteId()[this.firstNoteId().length - 1]}`}> 
                                    <button className='notes-but' onClick={this.notesButClick} style={{ backgroundColor: this.props.location.pathname.includes('notes') === true ? '#404040' : 'transparent' }}>
                                    <TbNotes  id='notes-logo' fill='#cccccc'  size='1.5em' color='black' /><p className='notes-text'>Notes</p> 
                                    </button>
                                </Link>
                                <br />
                                <Link className='notebooks-link'to='/notebooks'>
                                    <button className='notebooks-but' onClick={this.notebooksButClick} style={{ backgroundColor: this.props.location.pathname.includes('notebooks') === true ? '#404040'  : 'transparent'}}>
                                    <TbNotebook  fill='#cccccc' size='1.5em' color='black'  /><p className='notebooks-text'>Notebooks</p> 
                                    </button>
                                </Link>
                                <br />
                                {this.props.location.pathname.includes('tags') === false ? 
                                    <button className='tags-but' onClick={this.toggleTags} style={{ backgroundColor: this.state.tagsClick === false ? 'transparent' : '#404040' }} >
                                    <RiPriceTagFill size='1.5em' color='#cccccc' /><p className='tags-text'>Tags</p> 
                                    </button> : ''
                                }
                                {this.props.location.pathname.includes('tags') === true ?  this.turnOffTags() : null}
                                <br />
                                <button className="logout-but" onClick={this.props.logout}>
                                        <RiLogoutBoxFill size='1.5em' color='#cccccc' /><p className='logout-text'>Log out</p>
                                </button>
                            </div>
                        </div>
            </div>
        )
    }
}

export default Main 
                            
                        
                    
                
                        
                            
                    
                                
                        

                        


            
        

        
                

        