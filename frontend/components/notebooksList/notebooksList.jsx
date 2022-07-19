import React, { useDebugValue } from 'react'
import NotebookItem from '../notebookItem/notebookItem'
class NotebookList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', user_id: this.props.currentUser.id}
        this.createNote = this.createNote.bind(this)
    }

    componentDidMount(){
        let allNotebooks = this.props.fetchNotebooks
        dispatch(allNotebooks())
        
    }

 

    

    renderNotebooks(){
        let notebooksArray = Object.values(this.props.notebooks)
        return (
        <div>
          
           <ul>
                {notebooksArray.map((notebook) => (
                    <li>{<NotebookItem notebook={notebook}/>}</li>
                ))}
            </ul>


        </div>
   
        )
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

   createNote(e){
       const notebook = Object.assign({}, this.state)
       this.props.createNotebook(notebook)
       this.setState({name: '', user_id: this.props.currentUser.id})
   }



    render() {
        return (
            <div>
                <form onSubmit={this.createNote}>
                    <input 
                    type="text" 
                    value={this.state.name}
                    onChange={this.update('name')}
                    />
                    <input type="submit" value='submit' />
                </form>
                 <div>{this.renderNotebooks()}</div>
            </div>
               

        )
    }


}

export default NotebookList 