import React from 'react'
import { Link, Switch } from 'react-router-dom'
import { ProtectedRoute } from '../../util/route_util'
import NoteContainer from '../notesList/notes_container'
import NoteFormContainer from '../noteForm/noteForm_container'
import NoteItem from '../noteItem/note_item'
import {Route} from 'react-router-dom'
import NoteEditContainer from '../noteEdit/noteEdit_container'
class Main extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
     
        return (
            <div>
                <hgroup className="header-group">
                    <h2 className="header-name">Hi, {this.props.currentUser.username}!</h2>
                    <button className="header-button" onClick={this.props.logout}>Log Out</button>
                    <br />
                     <Link to='/notes'> 
                        <button>
                            Notes 
                        </button>
                    </Link>
                         {/* <br />
                    <Link to="/notes">
                        <button>
                            Home
                        </button>
                    </Link>
                    <br />
                    <Link to='/notes'>
                        <button>
                            Create Note 
                        </button>
                    </Link>
                   */}
                </hgroup>
                <ProtectedRoute path="/notes" component={NoteContainer}/>
                <Switch>
                 <ProtectedRoute  exact path="/notes/:id" component={NoteEditContainer} />
                <ProtectedRoute path="/notes" component={NoteFormContainer} />
                </Switch>

          
        

        
                
            </div>
        )
    }
}

export default Main 