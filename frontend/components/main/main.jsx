import React from 'react'
import { Link, Switch } from 'react-router-dom'
import { ProtectedRoute } from '../../util/route_util'
import NoteContainer from '../notesList/notes_container'
import NoteFormContainer from '../noteForm/noteForm_container'
import NoteItem from '../noteItem/note_item'
import {Route} from 'react-router-dom'
import NoteEditContainer from '../noteEdit/noteEdit_container'
import NotebookListContainer from '../notebooksList/notebooksList_container'
import NotebookShowContainer from '../notebookShow/notebookShow_container'
import Tag from '../tags'
class Main extends React.Component {
    constructor(props){
        super(props)
    }


    render(){
     
        return (
            <div>
                <hgroup className="header-group">
                    <h2 className="header-name">Hi, {this.props.currentUser.username}!</h2>
                     <Link to='/notes'> 
                        <button>
                            Notes 
                        </button>
                    </Link>
                    <br />
                    <Link to='/notebooks'>
                        <button>
                            Notebooks
                        </button>
                    </Link>
                    <br />
                    <Link to='/tags'>
                            <button>
                                 Tags 
                            </button>
                    </Link>

                    <br />
                    <button className="header-button" onClick={this.props.logout}>Log Out</button>
                    <Tag/>
                </hgroup>

            
                <Switch>
                    <ProtectedRoute exact path="/notebooks/:notebook_id/notes" component={NotebookShowContainer} />
                    <ProtectedRoute path="/notebooks/:notebook_id/notes/:note_id" component={NotebookShowContainer} />
                    <ProtectedRoute path="/notebooks" component={NotebookListContainer}/>
                </Switch>
         
                <ProtectedRoute path="/notes" component={NoteContainer}/>
                
               
                <Switch>
                 <ProtectedRoute path="/notebooks/:notebook_id/notes/:note_id" component={NoteEditContainer}/>
                 <ProtectedRoute path="/notes/:note_id" component={NoteEditContainer} />
                 <ProtectedRoute path="/notes" component={NoteFormContainer} />
                </Switch>

          
        

        
                
            </div>
        )
    }
}

export default Main 