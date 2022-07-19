import React from 'react'
import { Link } from 'react-router-dom';
import { deleteNotebook } from '../../actions/notebook_actions'

class NotebookItem extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount(){
        console.log(this.props)
    }
    render() {
        return (
            <li>
                <Link to={`/notebooks/${this.props.notebook.id}`}>
                    {this.props.notebook.name}
                </Link>
                
            </li>
        )
    }
}

export default NotebookItem