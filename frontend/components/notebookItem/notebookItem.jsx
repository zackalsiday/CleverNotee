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
    componentDidMount(){
        console.log(this.state)
    }


    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }


    deleteNotebook(notebookId){
        this.props.deleteNotebook(notebookId)
    }

    
    render() {
        return (
            <li>
                <Link to={`/notebooks/${this.props.notebook.id}/notes`}>
                    {this.props.notebook.name}
                </Link>
                <button onClick={() => this.deleteNotebook(this.props.notebook.id)}>Delete</button>
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