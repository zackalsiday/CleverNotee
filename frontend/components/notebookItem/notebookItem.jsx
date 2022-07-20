import React from 'react'
import { Link } from 'react-router-dom';
import { deleteNotebook } from '../../actions/notebook_actions'

class NotebookItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {id: this.props.notebook.id, name: this.props.notebook.name, user_id: this.props.notebook.userId}
        this.deleteNotebook = this.deleteNotebook.bind(this)
    }
    componentDidMount(){
        console.log(this.state)
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState == this.state){
            this.props.fetchNotebooks()
        }
    }

    deleteNotebook(){
        this.props.deleteNotebook(this.state.id)
        this.setState({id: '', name:'', user_id:''})
    }
    render() {
        return (
            <li>
                <Link to={`/notebooks/${this.props.notebook.id}`}>
                    {this.props.notebook.name}
                </Link>
                <button onClick={this.deleteNotebook}>Delete</button>
            </li>
        )
    }
}

export default NotebookItem