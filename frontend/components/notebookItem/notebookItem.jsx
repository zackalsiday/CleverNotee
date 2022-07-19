import React from 'react'
import { Link } from 'react-router-dom';


class NotebookItem extends React.Component {
    constructor(props) {
        super(props)
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