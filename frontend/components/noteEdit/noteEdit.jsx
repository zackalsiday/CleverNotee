import React from 'react'
import {Link} from 'react-router-dom'
class NoteEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            author_id: '',
            notebook_id: '',
            id: '',
            url: this.props.match.path == "/notebooks/:notebook_id/notes/:note_id" ? `/notebooks/${this.props.match.params.notebook_id}/notes` : '/notes'
        }
        this.deleteNote = this.deleteNote.bind(this)
     
    }


    componentDidMount() {
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
        if(prevProps.match.params.note_id != this.props.match.params.note_id) {
            dispatch(this.props.fetchNote(this.props.match.params.note_id)).then((res) => {
                this.setState({
                    title: res.note.title,
                    content: res.note.content,
                    author_id: res.note.authorId,
                    notebook_id: res.note.notebookId,
                    id: res.note.id
                })
            })
            const note = Object.assign({}, this.state)
            this.props.updateNote(note)
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
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    deleteNote(){
       
        this.props.deleteNote(this.state.id)
    }

   renderBackButton(){
       if (this.props.match.path == "/notebooks/:notebook_id/notes/:note_id" ){
           return (
               <button onClick={() => this.props.history.goBack()}>Return</button>
           )
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

  


    render() {
        return (
            <div>
                {this.renderBackButton()}
                <Link to={this.state.url} onClick={this.deleteNote}>Delete</Link>
                <form >
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
                    {this.notebookOptions()}
                </form>
                {/* {this.renderNoteTags()} */}
            </div>

        )

    }
}

export default NoteEdit 

