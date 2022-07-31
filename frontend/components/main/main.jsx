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
import TagsListContainer from '../tagsList/tagsList_container'
class Main extends React.Component {
    constructor(props){
        super(props)
        this.state = {tagsVisible: false}
        this.toggleTags = this.toggleTags.bind(this)
        this.turnOffTags = this.turnOffTags.bind(this)
    }

    toggleTags(){
        if(this.state.tagsVisible === false){
            this.setState({tagsVisible: true})
        }else{
            this.setState({tagsVisible: false})
        }
   
    }

    componentDidMount(){
        console.log(this.state)
    }

    componentDidUpdate(){
        console.log(this.state)
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



    render(){
     
        return (
            <div>
                <hgroup className="header-group">
                    <h2 className="header-name">Hi, {this.props.currentUser.username}!</h2>
                     <Link to='/notes'> 
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
                 
                        <button onClick={this.toggleTags}>
                            Tags 
                        </button>
          
                            
                  

                    <br />
                    <button className="header-button" onClick={this.props.logout}>Log Out</button>
                   
                </hgroup>

                {this.state.tagsVisible === true ? this.renderTags() : ''}
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