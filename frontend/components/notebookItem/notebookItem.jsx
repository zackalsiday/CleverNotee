import React from 'react'
import { Link } from 'react-router-dom';


class NotebookItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.notebook.id,
            name: this.props.notebook.name,
            user_id: this.props.notebook.userId 
        }
        this.deleteNotebook = this.deleteNotebook.bind(this)
    }



    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }


    deleteNotebook(notebookId){
        this.props.deleteNotebook(notebookId)
    }

    // deleteButton(){
    //     return(
    //         <button onClick={() => this.deleteNotebook(this.props.notebook.id)}>Delete</button>
    //     )
    // }

    
    render() {
        return (
            <li>
                <Link to={`/notebooks/${this.props.notebook.id}/notes`}>
                    {this.props.notebook.name}
                </Link>
                <br />
                {this.props.notebook.id != 1 ? this.deleteButton() : ''}
          
                <form onSubmit={() => this.props.updateNotebook(this.state)}>
                    <input 
                    type="text" 
                    value={this.state.name}
                    onChange={this.update('name')}
                    />
                    <input 
                    type="submit" 
                    value="submit"
                    />
                </form>
            </li>
        )
    }
}

export default NotebookItem