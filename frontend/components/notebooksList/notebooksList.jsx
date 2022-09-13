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
        let notebooksArray = Object.values(this.props.notebooks)
        this.props.fetchNotes()
    }

    // componentDidUpdate(prevProps, prevState){
    //     if(prevProps == this.props){
    //         dispatch(this.props.fetchNotebooks())
    //     }
    // }

 
 

    

    renderNotebooks(){
        let notebooksArray = Object.values(this.props.notebooks)
        return (
        <div>
        
           <ul>
                {notebooksArray.map((notebook) => (
                    <li>
                        {<NotebookItem 
                        notebook={notebook} 
                        deleteNotebook={this.props.deleteNotebook} 
                        fetchNotebooks={this.props.fetchNotebooks}
                        updateNotebook={this.props.updateNotebook}
                        notes={this.props.notes}
                        match={this.props.match}
                        />}
                        
                    </li>
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
        let notebooksArray = Object.values(this.props.notebooks)
        return (
            <div className='notebooks-container'>
                <div className='notebooks-content'>

                <div className='notebooks-header'>Notebooks</div>
                <div className='notebooks-count-create'>
                    {notebooksArray.length} notebook(s)
                    <form className='notebook-create-form' onSubmit={this.createNote}>
                        <input
                            className='notebook-create-input'
                            type="text"
                            value={this.state.name}
                            onChange={this.update('name')}
                        />
                        <input className='notebook-create-but' type="submit" value='Create Notebook' />
                    </form>
                </div>
                </div>
                
                {/* <form onSubmit={this.createNote}>
                    <input 
                    type="text" 
                    value={this.state.name}
                    onChange={this.update('name')}
                    />
                    <input type="submit" value='submit' />
                </form>
                 <div>{this.renderNotebooks()}</div> */}
            </div>
               

        )
    }


}

export default NotebookList 